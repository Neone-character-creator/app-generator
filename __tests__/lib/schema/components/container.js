const containerSchema = require("../../../../lib/schema/component/container");

describe("container", () => {
    it("must have a type", () => {
        const config = {};
        expect.assertions(2);
        try {
            containerSchema(config).validateSync(config, {
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
            containerSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("children is a required field");
        }
    });
    it("it must have at least one child", () => {
        const config = {
            type: "container",
            children: {}
        };
        expect.assertions(2);
        try {
            containerSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("children must have at least one key");
        }
    });
    it("may not have unknown properties", () => {
        const config = {
            type: "checkbox",
            foo: "bar"
        };
        expect.assertions(2);
        try {
            containerSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("this field cannot have keys not specified in the object shape");
        }
    });
});