const generateComponent = require("../../../lib/components/generateComponent");

describe("component generator module", () => {
    describe("when generating textfield components", () => {
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
});