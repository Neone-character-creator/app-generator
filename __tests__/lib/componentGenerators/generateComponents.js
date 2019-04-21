const generateComponent = require("../../../lib/componentGenerators/genericGenerator")();
const generateSelect = require("../../../lib/componentGenerators/selectGenerator");
const appGenerator = require("../../../lib/componentGenerators/appGenerator");

describe("component generation module", () => {
    it("throws an error when an unsupported type is given", () => {
        expect(() => {
            generateComponent('random')
        }).toThrow();
    });
    it("throws an error when an object is given", () => {
        expect(() => {
            generateComponent({})
        }).toThrow();
    });
    it("throws an error when null is given", () => {
        expect(() => {
            generateComponent(null)
        }).toThrow();
    });
    it("throws an error when undefined is given", () => {
        expect(() => {
            generateComponent(undefined)
        }).toThrow();
    });
    it("throws an error when a number is given", () => {
        expect(() => {
            generateComponent(1)
        }).toThrow();
    });
    describe("app components", () => {
        const config = {
            appName: "Test",
            views: [
                "summary",
                "one",
                "two"
            ],
            components: {
                app : {
                    type: "app"
                },
                summary: {
                    type: "view"
                },
                one: {
                    type: "view"
                },
                two: {
                    type: "view"
                }
            }
        };
        it("names the app based on the appName", () => {
            const generatedComponent = appGenerator(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`<div id="${config.appName}-app">`));
        });
        it("changes the name of the component", () => {
            const generatedComponent = appGenerator(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`<SummaryView/>`));
            expect(generatedComponent).toEqual(expect.stringContaining(`<OneView/>`));
            expect(generatedComponent).toEqual(expect.stringContaining(`<TwoView/>`));
        });
        it("adds imports for each child component", () => {
            const generatedComponent = appGenerator(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`import SummaryView from "./SummaryView"`));
            expect(generatedComponent).toEqual(expect.stringContaining(`import OneView from "./OneView"`));
            expect(generatedComponent).toEqual(expect.stringContaining(`import TwoView from "./TwoView"`));
        });
        it("throws an error if creating an app that isn't named 'app'", () => {
            expect(() => {
                generateComponent("app")("notApp");
            }).toThrow();
        })
    });
    describe("textfield components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views: [
                    "summary"],
                components: {
                    summary: {
                        type: "view"
                    },
                    textfield: {
                        type: "textfield",
                        label: "Label"
                    }
                }
            };
            const generated = generateComponent("textfield")("textfield")(config);
            expect(generated).toEqual(expect.stringContaining("<Textfield id=\"textfield-textfield\" label=\"Label\" value={props.boundValue} />"));
        });
        it("can be bound to a model property", () => {
            const config = {
                name: "Test",
                views: [
                    "summary"],
                components: {
                    summary: {
                        type: "view"
                    },
                    textfield: {
                        type: "textfield",
                        label: "Label",
                        bind: "model.string"
                    }
                }
            };
            const generated = generateComponent("textfield")("textfield")(config);
            expect(generated).toEqual(expect.stringContaining("const boundPropertyName = \"model.string\""));
        });
    });
    describe("select components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views: [
                    "summary"],
                components: {
                    summary: {
                        type: "view"
                    },
                    select: {
                        type: "select",
                        label: "Label",
                        values: [0,1,2]
                    }
                }
            };
            const generated = generateSelect("select")(config);
            expect(generated).toEqual(expect.stringContaining("<Select id=\"select-select\" value={props.boundValue}>"));
            expect(generated).toEqual(expect.stringContaining("<InputLabel id=\"select-select-label\">Label</InputLabel>"));
            expect(generated).toEqual(expect.stringContaining("<MenuItem id=\"select-select-value-0\" value=0>0</MenuItem>"));
            expect(generated).toEqual(expect.stringContaining("<MenuItem id=\"select-select-value-1\" value=1>1</MenuItem>"));
            expect(generated).toEqual(expect.stringContaining("<MenuItem id=\"select-select-value-2\" value=2>2</MenuItem>"));
            expect(generated).toEqual(expect.stringContaining("</Select>"));
        });
        it("can be bound to a model property", () => {
            const config = {
                name: "Test",
                views: [
                    "summary"],
                components: {
                    summary: {
                        type: "view"
                    },
                    textfield: {
                        type: "textfield",
                        label: "Label",
                        bind: "model.string"
                    }
                }
            };
            const generated = generateComponent("textfield")("textfield")(config);
            expect(generated).toEqual(expect.stringContaining("const boundPropertyName = \"model.string\""));
        });
    });
    describe("Container compoents", () => {
        const config = {
            name: "Test",
            views: ["summary"],
            components: {
                summary: {
                    type: "view",
                    children: ["container"]
                },
                "container": {
                    type: "container",
                    direction: "vertical",
                    children: ["foo"]
                },
                "foo" : {
                    type: "textfield",
                }
            }
        };
        it("renders the container inside in the parent", () => {
            const generatedComponent = generateComponent('view')('summary')(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`<ContainerContainer />`));
        });
        it("changes the name of the component", async (done) => {
            const generatedComponent = generateComponent('container')('container')(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`<Grid id="container-container" container direction={"vertical" == "vertical" ? "column" : "row"}>`));
            done()
        });

    });
    describe("number components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views:
                    ["summary"],
                components: {
                    summary: {
                        type: "view",
                        children: [
                            "foo"
                        ]
                    },
                    foo: {
                        type: "number",
                        label: "Number",
                        value: 1
                    }
                }
            };
            const generated = generateComponent("number")("foo")(config);
            expect(generated).toEqual(expect.stringContaining("<Textfield id=\"foo-number\" label=\"Number\" type=\"number\" value={props.boundValue} />"));
        });
    });
    describe("label components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views: ["summary"],
                components: {
                    summary: {
                        type: "view",
                        children: [
                            "foo"
                        ]
                    },
                    foo: {
                        type: "label",
                        value: "foo"
                    }
                }
            };
            const generated = generateComponent("label")("foo")(config);
            expect(generated).toEqual(expect.stringContaining("<p>foo</p>"));
        });
    });
    describe("checkbox components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views: ["summary"],
                components: {
                    summary: {
                        type: "view",
                        children: [
                            "foo"
                        ]
                    },
                    foo: {
                        type: "checkbox",
                        value: "foo"
                    }
                }
            };
            const generated = generateComponent("checkbox")("foo")(config);
            expect(generated).toEqual(expect.stringContaining("<Checkbox id=\"foo-checkbox\" checked={props.boundValue} />"));
        });
    });
});