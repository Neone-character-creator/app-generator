const generateComponent = require("../../../lib/componentGenerators/genericGenerator")();
describe("view component generator", () => {
    const config = {
        componentName: "Test",
        views: ["summary-view"],
        components: {
            "summaryview": {
                name:"summary",
                type: "view",
                children: ["footextfield"],
            },
            "footextfield": {
                name:"foo",
                type: "textfield"
            }
        }
    };
    it("renders the child components", () => {
        const generatedComponent = generateComponent("view")("summary")(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`<FooTextfield value={this.props.value} index={this.props.index}/>`));
    });
    it("adds imports for each child component", () => {
        const generatedComponent = generateComponent("view")("summary")(config);
        expect(generatedComponent).toEqual(expect.stringContaining(`import FooTextfield from './FooTextfield';`));
    });
    it("throws an error if a child has an invalid type", () => {
        const config = {
            componentName: "Test",
            views: ["summary"],
            components: {
                foo: {
                    type: "invalid"
                }
            }
        };
        expect(() => {
            generateComponent("view")("summary")(config);
        }).toThrow();
    });
    it("throws an error if a view has no children", () => {
        const config = {
            componentName: "Test",
            views:
                ["aummary"],
            components: {
                summary: {},
            }
        };
        expect(() => {
            generateComponent("view")("summary")(config);
        }).toThrow();
    });
    it("throws an error for unsupported child type", () => {
        const config = {
            componentName: "Test",
            views: ["summary"],
            components: {
                summary: {
                    type: "view",
                    children: ["foo", "bar"]
                },
                foo: {
                    type: "some nonsense"
                }
            }
        };
        expect(() => {
            generateComponent("view")("summary")(config)
        }).toThrowErrorMatchingSnapshot();
    });
});