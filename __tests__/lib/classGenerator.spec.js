const ModelGenerator = require("../../lib/classGenerator");
describe("App model class generator", function () {
    let modelGeneratorInstance;
    let individualGenerator;
    const modelConfig = {
        one: {},
        two: {},
        three: {}
    };
    beforeEach(() => {
        individualGenerator = jest.fn();
        modelGeneratorInstance = new ModelGenerator(individualGenerator, modelConfig, ".");
    });
    it("calls the class generator function for each configuration", function () {
        modelGeneratorInstance.generate();
        expect(individualGenerator.mock.calls.length).toEqual(3);
    });
});