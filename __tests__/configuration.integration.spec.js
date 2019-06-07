const fs = require("fs-extra");
const path = require("path");
const configTransformer = require("../lib/model/transformers/app");

describe("plugin generation chain", () => {
   it("completes", async done => {
       try {
           const loaded = fs.readFileSync(path.resolve(__dirname, `test.json`), 'utf-8');
           const configFile = require("../lib/schema/configuration")(JSON.parse(loaded));
           const hierarchy = require('../lib/generateComponentsHierarchy').default(configFile);
           const components = await require('../lib/componentGenerator')(hierarchy);
           expect(components.Summary.path).toEqual("components/SummaryView.js");
           expect(components.Summary.content).toMatchSnapshot();
           done();
       } catch (e) {
           done(e);
       }
   });
});