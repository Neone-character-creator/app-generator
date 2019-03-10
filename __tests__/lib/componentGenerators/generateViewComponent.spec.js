const generateComponent = require('../../../lib/components/generateComponent');
describe("View component generator", () => {
    const config = {
        name: "Test",
        views: {
            summary: {
                children: ["foo"]
            }
        },
        components: {
            foo: {
                type: "textfield"
            }
        }
    };
    it("renders the child components", () => {
        const generatedComponent = generateComponent("view")("summary")(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`<TextField id="foo" value="" />`));
    });
    it("adds imports for each child component", () => {
        const generatedComponent = generateComponent("view")("summary")(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`import TextField from "@material-ui/core/TextField";`));
    });
});