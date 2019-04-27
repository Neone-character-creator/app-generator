const numberSchema = require("../../../../lib/schema/component/number");

describe("number", () => {
    it("must have a type", () => {
        const config = {};
        expect.assertions(2);
        try {
            numberSchema(config).validateSync(config, {
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
            numberSchema(config).validateSync(config, {
                abortEarly: false
            });
        } catch(e) {
            expect(e.errors.length).toBeGreaterThanOrEqual(1);
            expect(e.errors).toContain("type must be one of the following values: number");
        }
    });
    it("may not have unknown properties", () => {
        const config = {
            type: "number",
            foo: "bar"
        };
        expect.assertions(2);
        try {
            numberSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("this field cannot have keys not specified in the object shape");
        }
    });
});