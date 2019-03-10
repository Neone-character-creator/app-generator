const generateComponent = require('../../../lib/components/generateComponent');
describe("Container component generator", ()=>{
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