const fs = require("fs-extra");
const path = require("path");

describe("plugin generation chain", () => {
   it("completes", async done => {
       try {
           const configFile = await require("../lib/configurationSchema")(JSON.parse(fs.readFileSync(path.resolve(__dirname, `test.json`), 'utf-8')));
           const hierarchy = require('../lib/generateComponentsHierarchy').default(configFile);
           const components = await require('../lib/componentGenerator')(hierarchy);
           expect(components.components.summary).toEqual({
               type: "view",
               children: [
                   "biography",
                   "combat",
                   "characteristics",
                   "skills"
               ]
           });

           expect(component.components.biography).toEqual({
               type: "container",
               direction: "vertical",
               children: [
                   "name",
                   "species",
                   "career",
                   "specializations"
               ]
           })
       } catch (e) {
           done(e);
       }
   });
});