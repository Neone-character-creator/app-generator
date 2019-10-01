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
            views: ["one-view"],
            components: {
                "app-app": {
                    name:"app",
                    type: "app",
                    children: [
                        "one-view"
                    ]
                },
                "one-view": {
                    name:"one",
                    type: "view",
                    children: ["foo-textfield"]
                },
                "foo-textfield": {
                    name:"foo",
                    type: "textfield"
                }
            }
        };
        const components = await componentGenerator(hierarchy);
        expect(components["app-app"].path).toBe('components/App.js');
        expect(renderer.create(components["app-app"].content).toJSON()).toMatchSnapshot();

        expect(components["one-view"].path).toBe('components/OneView.js');
        expect(renderer.create(components["one-view"].content).toJSON()).toMatchSnapshot();
    });
});