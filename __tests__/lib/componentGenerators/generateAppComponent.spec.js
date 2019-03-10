const generateComponent = require('../../../lib/components/generateComponent');
describe("App component generator", ()=>{
    const config = {
        name: "Test",
        views: {
            "summary":{},
            "one":{},
            "two":{}
        }
    };
    it("changes the name of the component", async (done) => {
        const generatedComponent = generateComponent('app')('app')(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`<SummaryView>`));
        expect(generatedComponent).toEqual(expect.stringContaining(`<OneView>`));
        expect(generatedComponent).toEqual(expect.stringContaining(`<TwoView>`));
        done()
    });
    it("adds imports for each child component", async (done) => {
        const generatedComponent = generateComponent('app')('app')(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`import * as SummaryView from "../views/SummaryView"`));
        expect(generatedComponent).toEqual(expect.stringContaining(`import * as OneView from "../views/OneView"`));
        expect(generatedComponent).toEqual(expect.stringContaining(`import * as TwoView from "../views/TwoView"`));
        done()
    });
});