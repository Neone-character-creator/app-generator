const labelSchema = require("../../../../lib/schema/component/label");

describe("label", () => {
    it("must have a type", () => {
        const config = {};
        expect.assertions(2);
        try {
            labelSchema(config).validateSync(config, {
                abortEarly: false
            });
        } catch(e) {
            expect(e.errors.length).toBeGreaterThanOrEqual(1);
            expect(e.errors).toContain("type is a required field");
        }
    });
    it("type must be container", () => {
        const config = {
            type: "foobar"
        };
        expect.assertions(2);
        try {
            labelSchema(config).validateSync(config, {
                abortEarly: false
            });
        } catch(e) {
            expect(e.errors.length).toBeGreaterThanOrEqual(1);
            expect(e.errors).toContain("type must be one of the following values: label");
        }
    });
    it("must have a value property", () => {
        const config = {
            type: "label",
        };
        expect.assertions(2);
        try {
            labelSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors).toContain("value is a required field");
        }
    });
});