const transformer = require("../../../../lib/model/transformers/app");

describe("app config transformer", () => {
    it("throws an error if components undefined", () => {
       expect(()=>transformer({})).toThrowErrorMatchingSnapshot();
    });
});