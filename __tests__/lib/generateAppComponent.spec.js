const generateComponent = require('../../lib/generateAppComponent');
describe("App component generator", ()=>{
    it("changes the name of the component", () => {
        const generatedComponent = generateComponent({
            name: "Test"
        });
        expect(generatedComponent).toEqual(expect.stringContaining(`const TestApp =`));
        expect(generatedComponent).toEqual(expect.not.stringContaining(`%name%`));
    });
    it("changes the name of the component", () => {
        const generatedComponent = generateComponent({
            name: "Test",
            views: {
                "summary":{},
                "one":{},
                "two":{}
            }
        });
        expect(generatedComponent).toEqual(expect.stringContaining(`const TestApp =`));
        expect(generatedComponent).toEqual(expect.not.stringContaining(`%name%`));
    });
});