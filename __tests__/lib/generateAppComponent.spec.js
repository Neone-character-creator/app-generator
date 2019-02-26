const generateComponent = require('../../lib/generateAppComponent');
describe("App component generator", ()=>{
    it("changes the name of the component", () => {
        const generatedComponent = generateComponent({
            name: "Test"
        });
        expect(/const TestApp = /.test(generatedComponent)).toBeTruthy();
        expect(/%name%/.test(generatedComponent)).toBeFalsy();
    });
});