const numberTransformer = require("../../../../lib/model/transformers/number");

describe("number transformer", () => {
    it("transforms a string into a default object", () => {
        const config = "number";
        const transformed = numberTransformer(config);
        expect(transformed.type).toBe("number");
        expect(transformed.min).not.toBeDefined();
        expect(transformed.max).not.toBeDefined();
    });
    it("throws an error if value isn't number", () => {
       expect(()=>numberTransformer("string")).toThrowErrorMatchingSnapshot();
    });
});