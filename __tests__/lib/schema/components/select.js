const selectSchema = require("../../../../lib/schema/component/select");

describe("select", () => {
    it("must have a type", () => {
        const config = {};
        expect.assertions(2);
        try {
            selectSchema(config).validateSync(config, {
                abortEarly: false
            });
        } catch(e) {
            expect(e.errors.length).toBeGreaterThanOrEqual(1);
            expect(e.errors).toContain("type is a required field");
        }
    });
    it("type must be select", () => {
        const config = {
            type: "asdfasdfasdf"
        };
        expect.assertions(2);
        try {
            selectSchema(config).validateSync(config, {
                abortEarly: false
            });
        } catch(e) {
            expect(e.errors.length).toBeGreaterThanOrEqual(1);
            expect(e.errors).toContain("type must be one of the following values: select");
        }
    });
    it("must have a values property", () => {
        const config = {
            type: "select",
        };
        expect.assertions(2);
        try {
            selectSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors).toContain("values must be a string or array");
        }
    });
});