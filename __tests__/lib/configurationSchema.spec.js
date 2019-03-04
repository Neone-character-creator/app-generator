const configSchema = require('../../lib/configurationSchema');
describe("the configuration schema", () => {
    it("requires the configuration to have a views top-level element", done => {
        const config = {};
        configSchema(config).validate(config, {
            strict: true
        }).catch(e => {
            expect(e.message).toBe("views is a required field");
            done();
        });
    });
    describe("the summary view", () => {
        it("requires views to contain at least the summary view", done => {
            const config = {
                views: {
                    summary: {}
                }
            };
            expect.assertions(1);
            configSchema(config).validate(config, {
                strict: true
            }).then(validated => {
                expect(validated).toBeTruthy();
                done();
            });
        });
    });
    describe("the non-summary views", () => {
        it("must have a name field", done => {
            const config = {
                views: {
                    summary: {},
                    one: {}
                }
            };
            expect.assertions(1);
            configSchema(config).validate(config, {
                strict: true
            }).catch(e => {
                expect(e.message).toBe("views.one.name is a required field");
                done();
            });
        });
    });
});