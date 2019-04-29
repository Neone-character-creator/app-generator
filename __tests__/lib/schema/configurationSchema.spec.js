const configSchema = require('../../../lib/schema/configuration');

describe("the configuration schema", () => {
    describe("the views", () => {
        it("must have a name field", () => {
            const config = {
                views: {
                    children: [
                        {},
                        {}
                    ]
                }
            };
            expect.assertions(2);
            try {
                configSchema(config)
            } catch (e) {
                expect(e.errors).toContain("views.children[0].name is a required field");
                expect(e.errors).toContain("views.children[1].name is a required field");
            }
        });
        it("must have children", () => {
            const config = {
                views: {}
            };
            expect.assertions(1);
            try {
                configSchema(config);
            } catch (e) {
                expect(e.errors).toContain("views.children is a required field");
            }
        })
    });
    describe("the models", () => {
        it("must have a character field", () => {
            const config = {
                model: {}
            };
            expect.assertions(1);
            try {
                configSchema(config);
            } catch (e) {
                expect(e.errors).toContain("model.character is a required field");
            }
        });
        it("must have a character field", () => {
            const config = {
                views: {
                    children: []
                },
                model: {}
            };
            expect.assertions(2);
            try {
                configSchema(config);
            } catch (e) {
                expect(e.errors.length).toEqual(2);
                expect(e.errors).toContain("model.character is a required field");
            }
        });
    });
});