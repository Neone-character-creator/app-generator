const configSchema = require('../../lib/configurationSchema');
describe("the configuration schema", () => {
    it("requires the configuration to have a views top-level element", done => {
        const config = {

        };
        configSchema.validate(config, {
            strict: true
        }).catch(e => {
            expect(e.message).toBe("views is a required field");
            done();
        });
    });
    it("requires views to contain at least the summary field", done => {
        const config = {
            views: {
                summary: {}
            }
        };
        expect.assertions(1);
        configSchema.validate(config, {
            strict: true
        }).then(validated => {
            expect(validated).toBeTruthy();
            done();
        });
    });
});