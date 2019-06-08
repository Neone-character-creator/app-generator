const generateComponent = require("../../../lib/componentGenerators/genericGenerator")();
const generateSelect = require("../../../lib/componentGenerators/selectGenerator");
const appGenerator = require("../../../lib/componentGenerators/appGenerator");

describe("component generation module", () => {
    it("throws an error when creating a generator for an unsupported type", () => {
        expect(() => {
            generateComponent('random')
        }).toThrowErrorMatchingSnapshot();
    });
    it("throws an error when an object is given", () => {
        expect(() => {
            generateComponent({})
        }).toThrowErrorMatchingSnapshot();
    });
    it("throws an error when null is given", () => {
        expect(() => {
            generateComponent(null)
        }).toThrowErrorMatchingSnapshot();
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
    it("throws an error when a view has a child of an invalid type", () => {
        const config = {
            name: "Test",
            views: [
                "summary"],
            components: {
                summary: {
                    type: "view",
                    children: [
                        "bad"
                    ]
                },
                bad: {
                    type: "notAValidType",
                    label: "Label"
                }
            }
        };
        expect(() => {
            generateComponent("view")("summary")(config);
        }).toThrowErrorMatchingSnapshot();
    });
    it("throws an error when a component has a child of an invalid type", () => {
        const config = {
            name: "Test",
            views: [
                "summary"],
            components: {
                summary: {
                    type: "view",
                    children: [
                        "parent"
                    ]
                },
                parent: {
                    type: "container",
                    label: "Label",
                    children: [
                        "badChild"
                    ]
                },
                badChild: {
                    type: "bad",
                }
            }
        };
        expect(() => {
            generateComponent("container")("parent")(config);
            fail();
        }).toThrowErrorMatchingSnapshot();
    });
    it("throws an error when a component has a key but is undefined", () => {
        const config = {
            name: "Test",
            views: [
                "summary"],
            components: {
                summary: {
                    type: "view",
                    children: [
                        "parent"
                    ]
                },
                parent: undefined,
                badChild: {
                    type: "bad",
                }
            }
        };
        expect(() => {
            generateComponent("container")("parent")(config);
            fail();
        }).toThrowErrorMatchingSnapshot();
    });
    describe("app components", () => {
        const config = {
            appName: "Test",
            views: ["summary", "one", "two"],
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
            expect(generated).toMatchSnapshot();
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
            expect(generated).toMatchSnapshot();
        });
        it("can be bound to an action", () => {
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
                        click: "open.popup"
                    }
                }
            };
            const generated = generateComponent("textfield")("textfield")(config);
            expect(generated).toMatchSnapshot();
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
                        items: {
                            values: [0, 1, 2]
                        }
                    }
                }
            };
            const generated = generateSelect("select")(config);
            expect(generated).toMatchSnapshot();
        });
        it("throws an error if values is undefined", () => {
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
                        items: {

                        }
                    }
                }
            };
            expect(()=>generateSelect("select")(config)).toThrowErrorMatchingSnapshot();
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
                "foo": {
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
            expect(generatedComponent).toEqual(expect.stringContaining(`<Grid id="container-container" container spacing={8} justify="space-around" direction={"vertical" == "vertical" ? "column" : "row"}>`));
            done()
        });

    });
    describe("view components", () => {
        const config = {
            name: "Test",
            views: ["summary"],
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
            expect(generatedComponent).toEqual(expect.stringContaining(`<FooTextfield />`));
        });
        it("throws an error if a child has an invalid type", () => {
            const config = {
                name: "Test",
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
                name: "Test",
                components: {
                    app: {
                        type: "app",
                        children: ["summary"]
                    },
                    summary: {
                        type: "view"
                    },
                }
            };
            expect(() => {
                generateComponent("view")("summary")(config);
            }).toThrow();
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
            expect(generated).toEqual(expect.stringContaining("<Textfield id=\"foo-number\" label=\"Number\" type=\"number\" value={props.boundValue} onChange={props.update} />"));
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
            expect(generated).toEqual(expect.stringContaining("<Checkbox id=\"foo-checkbox\" checked={props.boundValue} onChange={props.update} />"));
        });
    });
});