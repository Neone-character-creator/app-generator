const transformer = require("../../../../lib/model/transformers/app");

describe("app config transformer", () => {
    it("throws an error if views undefined", () => {
       expect(()=>transformer({})).toThrowErrorMatchingSnapshot();
    });
});