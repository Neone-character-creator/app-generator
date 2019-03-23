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
            components: {
                app: {
                    type: "app",
                    children: [
                        "one"
                    ]
                },
                one: {
                    type: "view",
                    children: ["foo"]
                },
                foo: {
                    type: "textfield"
                }
            }
        };
        const generated = await componentGenerator(hierarchy);
        expect(generated.components.app.path).toBe('components/App.js');
        expect(renderer.create(hierarchy.components.app.content).toJSON()).toMatchSnapshot();

        expect(generated.components.one.path).toBe('components/OneView.js');
        expect(renderer.create(hierarchy.components.one.content).toJSON()).toMatchSnapshot();
    });
});