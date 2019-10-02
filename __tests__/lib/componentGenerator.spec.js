const componentGenerator = require("../../lib/componentGenerator");
const sinon = require("sinon");
const renderer = require("react-test-renderer");

describe("component generator module", () => {
    let componentWriter;
    beforeEach(() => {
        componentWriter = sinon.stub()
    });

    it("throws an error if views are undefined", () => {
        const hierarchy = {
            gameName: "test",
            components: {
                one: {
                    type: "view",
                    children: ["foo"]
                },
                foo: {
                    type: "textfield"
                }
            }
        };
        expect(() => componentGenerator(hierarchy)).toThrowErrorMatchingSnapshot();
    });

    it("writes an app component", async () => {
        const hierarchy = {
            gameName: "test",
            views: ["oneview"],
            components: {
                "appapp": {
                    name:"app",
                    type: "app",
                    children: [
                        "oneview"
                    ]
                },
                "oneview": {
                    name:"one",
                    type: "view",
                    children: ["footextfield"]
                },
                "footextfield": {
                    name:"foo",
                    type: "textfield"
                }
            }
        };
        const components = await componentGenerator(hierarchy);
        expect(components["appapp"].path).toBe('components/App.js');
        expect(renderer.create(components["appapp"].content).toJSON()).toMatchSnapshot();

        expect(components["oneview"].path).toBe('components/OneView.js');
        expect(renderer.create(components["oneview"].content).toJSON()).toMatchSnapshot();
    });
});