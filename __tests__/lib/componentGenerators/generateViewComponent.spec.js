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
            summary: {
                type: "view",
                children: ["foo"],
            },
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
    it("throws an error if a child has an invalid type", () => {
        const config = {
            name: "Test",
            views: {
                summary: {
                    children: ["foo"]
                }
            },
            components: {
                foo: {
                    type: "invalid"
                }
            }
        };
        expect(()=>{const generatedComponent = generateComponent("view")("summary")(config);}).toThrow();
    });
    it("doesn't duplicate imports", () => {
        const config = {
            name: "Test",
            views: {
                summary: {
                    children: ["foo", "bar"]
                }
            },
            components: {
                summary: {
                    type: "view",
                    children: ["foo", "bar"]
                },
                foo: {
                    type: "textfield"
                },
                bar : {
                    type: "textfield"
                }
            }
        };
        const generatedComponent = generateComponent("view")("summary")(config);
        expect(generatedComponent.match(/import TextField from "@material-ui\/core\/TextField";/g).length).toBe(1);
    });
});