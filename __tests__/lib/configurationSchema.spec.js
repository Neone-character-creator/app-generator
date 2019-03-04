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
    it("requires views to contain at least the summary view", done => {
        const config = {
            views: {
                summary: {}
            }
        };
        expect.assertions(1);
        return configSchema(config).validate(config, {
            strict: true
        }).then(validated => {
            expect(validated).toBeTruthy();
            done();
        }).catch(e => console.log(e));
    });
    describe("the summary view", () => {
       it("has a default 'name' of Character", done => {
           const config = {
               views: {
                   summary: {}
               }
           };
           expect.assertions(2);
           configSchema(config).validate(config).then(validated => {
               expect(validated.views.summary).toBeTruthy();
               expect(validated.views.summary.name).toBe("Character");
               done();
           });
       }) ;
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