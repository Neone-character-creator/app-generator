const configSchema = require('../../lib/schema/configuration');
describe("the configuration schema", () => {
    describe("the views", () => {
        it("must have a name field", () => {
            const config = {
                views: {
                    children: {
                        summary: {
                            children: {}
                        },
                        one: {
                            children: {}
                        }
                    }
                }
            };
            expect.assertions(3);
            try {
                configSchema(config)
            } catch (e) {
                expect(e.errors.length).toEqual(2);
                expect(e.errors[0]).toBe("views.children.summary.name is a required field");
                expect(e.errors[1]).toBe("views.children.one.name is a required field");
            }
        });
        it("must have children", () => {
            const config = {
                views: {
                    children: {
                        summary: {
                            name: "Summary"
                        },
                        one: {
                            name: "One"
                        }
                    }
                }
            };
            expect.assertions(3);
            try {
                configSchema(config)
            } catch (e) {
                expect(e.errors.length).toEqual(2);
                expect(e.errors[0]).toBe("views.children.summary.children is a required field");
                expect(e.errors[1]).toBe("views.children.one.children is a required field");
            }
        })
    });
});