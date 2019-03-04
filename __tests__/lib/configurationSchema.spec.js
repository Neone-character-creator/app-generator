const configSchema = require('../../lib/configurationSchema');
describe("the configuration schema", () => {
    describe("the summary view", () => {
        it("is created if not set in the views", () => {
           const config = {
               views: {}
           };
            expect.assertions(2);
            return configSchema(config).then(validated => {
                expect(validated.views.summary).toBeTruthy();
                expect(validated.views.summary.name).toBe("Character");
            });
        });
       it("has a default 'name' of Character", () => {
           const config = {
               views: {
                   summary: {}
               }
           };
           expect.assertions(2);
           return configSchema(config).then(validated => {
               expect(validated.views.summary).toBeTruthy();
               expect(validated.views.summary.name).toBe("Character");
           });
       }) ;
       it("can override the name by setting the property", () => {
           const config = {
               views: {
                   summary: {
                       name: "Replacement"
                   }
               }
           };
           expect.assertions(2);
           return configSchema(config).then(validated => {
               expect(validated.views.summary).toBeTruthy();
               expect(validated.views.summary.name).toBe("Replacement");
           }).catch(fail);
       });
    });
    describe("the non-summary views", () => {
        it("must have a name field", () => {
            const config = {
                views: {
                    summary: {},
                    one: {}
                }
            };
            expect.assertions(1);
            return configSchema(config).catch(e => {
                expect(e.message).toBe("views.one.name is a required field");
            });
        });
    });
});