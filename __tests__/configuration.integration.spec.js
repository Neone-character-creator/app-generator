const fs = require("fs-extra");
const path = require("path");

describe("plugin generation chain", () => {
   it("completes", async done => {
       try {
           const configFile = await require("../lib/schema/configuration")(JSON.parse(fs.readFileSync(path.resolve(__dirname, `test.json`), 'utf-8')));
           const hierarchy = require('../lib/generateComponentsHierarchy').default(configFile);
           const components = await require('../lib/componentGenerator')(hierarchy);
           expect(components.summary.path).toEqual("components/SummaryView.js");
           expect(components.summary.content).toMatchSnapshot();
           done();
       } catch (e) {
           done(e);
       }
   });
});