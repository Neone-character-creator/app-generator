const fs = require("fs-extra");
const path = require("path");

describe("plugin generation chain", () => {
   it("completes", async done => {
       try {
           const loaded = fs.readFileSync(path.resolve(__dirname, `test.json`), 'utf-8');
           const configFile = require("../lib/schema/configuration")(JSON.parse(loaded));
           configFile.views.name = "app";
           configFile.views.type = "app";
           const hierarchy = Object.assign(configFile,
               require('../lib/generateComponentsHierarchy').default(configFile.views), {
               app: {
                   type: "app",
                   children: configFile.views.children.map(v => v.name)
               }
           }) ;
           const components = require('../lib/componentGenerator')(hierarchy);
           expect(components['Summary-view'].path).toEqual("components/SummaryView.js");
           expect(components['Summary-view'].content).toMatchSnapshot();
           done();
       } catch (e) {
           done(e);
       }
   });
});