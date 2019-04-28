const transformer = require("../../../../lib/model/transformers/app");

describe("app config transformer", () => {
    it("leaves an empty object unchanged", () => {
       const original = {};
       const transformed = transformer(original);
       expect(transformed).toEqual({});
    });
    it("replaces string shorthand with configuration object", () => {
        const original = {
            string: "string"
        };
        const transformed = transformer(original);
        expect(transformed).toEqual({
            string: {
                type: "string"
            }
        });
    })
});