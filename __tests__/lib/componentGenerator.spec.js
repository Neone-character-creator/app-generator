const componentGenerator = require("../../lib/componentGenerator");
const sinon = require("sinon");
const renderer = require("react-test-renderer");

describe("component generator module", () =>{
    let componentWriter;
    beforeEach(()=>{
        componentWriter = sinon.stub()
    });

    it("writes an app component", async () => {
        const hierarchy = {
            appName: "test",
            views: {
                one: {
                    children: ["foo"]
                }
            },
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
        const components = await componentGenerator(hierarchy);
        expect(components.app.path).toBe('/app.js');
        expect(renderer.create(components.app.content).toJSON()).toMatchSnapshot();

        expect(components.views.one.path).toBe('/views/one.js');
        expect(renderer.create(components.views.one.content).toJSON()).toMatchSnapshot();
    });
});