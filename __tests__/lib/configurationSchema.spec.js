const configSchema = require('../../lib/configurationSchema');
describe("the configuration schema", () => {
    describe("the summary view", () => {
       it("has a default 'name' of Character", done => {
           const config = {
               views: {
                   summary: {}
               }
           };
           expect.assertions(2);
           configSchema(config).then(validated => {
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
            configSchema(config).catch(e => {
                expect(e.message).toBe("views.one.name is a required field");
                done();
            });
        });
    });
});