const generateComponent = require('../../lib/generateAppComponent');
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
        const generatedComponent = await generateComponent(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`const TestApp =`));
        expect(generatedComponent).toEqual(expect.not.stringContaining(`%name%`));
        done()
    });
    it("changes the name of the component", async (done) => {
        const generatedComponent = await generateComponent(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`const TestApp =`));
        expect(generatedComponent).toEqual(expect.not.stringContaining(`%name%`));
        expect(generatedComponent).toEqual(expect.stringContaining(`<SummaryView>`));
        expect(generatedComponent).toEqual(expect.stringContaining(`<OneView>`));
        expect(generatedComponent).toEqual(expect.stringContaining(`<TwoView>`));
        done()
    });
});