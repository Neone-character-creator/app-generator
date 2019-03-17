const fs = require("fs-extra");
const path = require("path");

describe("plugin generation chain", () => {
   it("completes", async done => {
       try {
           const configFile = await require("../lib/configurationSchema")(JSON.parse(fs.readFileSync(path.resolve(__dirname, `test.json`), 'utf-8')));
           const hierarchy = require('../lib/generateComponentsHierarchy').default(configFile);
           const components = await require('../lib/componentGenerator')(hierarchy);
           expect(components.components.summary.path).toEqual("components/SummaryContainer.js");
           expect(components.components.summary.content).toMatchSnapshot();
           done();
       } catch (e) {
           done(e);
       }
   });
});