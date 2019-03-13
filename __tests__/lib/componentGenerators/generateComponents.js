const generateComponent = require("../../../lib/components/generateComponent");

describe("component generation module", () => {
    it("throws an error when an unsupported type is given", () => {
        expect(()=>{generateComponent('random')}).toThrow();
    });
    describe("app components", () => {
        const config = {
            name: "Test",
            views: {
                "summary":{},
                "one":{},
                "two":{}
            },
            components: {
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
    describe("textfield components", () => {
        it("generates the component", () => {
            const config = {
                name: "Test",
                views: {
                    "summary": {
                        children: [
                            "textfield"
                        ]
                    },
                },
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
            expect(generated).toEqual(expect.stringContaining("<TextField id=\"textfield-textfield\" label=\"Label\" />"));
        });
    });
    describe("Container compoents", ()=>{
        const config = {
            name: "Test",
            views: {
                "summary":{}
            },
            components: {
                summary: {
                    children: ["container"]
                },
                "container" : {
                    type: "container",
                    direction: "vertical"
                }
            }
        };
        it("changes the name of the component", async (done) => {
            const generatedComponent = generateComponent('container')('container')(config);
            expect(generatedComponent).toEqual(expect.stringContaining(`<Grid id="container-container" direction={"vertical" == "vertical" ? "column" : "row"}>`));
            done()
        });
    });
    describe("view components", () => {
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
            expect(()=>{generateComponent("view")("summary")(config);}).toThrow();
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
});