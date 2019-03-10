const configSchema = require('../../lib/configurationSchema');
describe("the configuration schema", () => {
    describe("the non-summary views", () => {
        it("must have a name field", () => {
            const config = {
                views: {
                    children: {
                        summary: {},
                        one: {}
                    }
                }
            };
            expect.assertions(3);
            return configSchema(config).catch(e => {
                expect(e.errors.length).toEqual(2);
                expect(e.errors[0]).toBe("views.children.summary.name is a required field");
                expect(e.errors[1]).toBe("views.children.one.name is a required field");
            });
        });
    });
});