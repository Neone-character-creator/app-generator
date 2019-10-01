const checkboxSchema = require("../../../../lib/schema/component");

describe("checkbox", () => {
    it("must have a type", () => {
        const config = {};
        expect.assertions(2);
        try {
            checkboxSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("type is a required field");
        }
    });
    it("type must be textfield", () => {
        const config = {
            type: "foobar"
        };
        expect.assertions(2);
        try {
            checkboxSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("type must be one of the following values: checkbox, container, label, number, select, textfield, list, button");
        }
    });
    it("may not have unknown properties", () => {
        const config = {
            name: "checkbox",
            type: "checkbox",
            foo: "bar"
        };
        expect.assertions(2);
        try {
            checkboxSchema(config).validateSync(config);
        } catch(e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors[0]).toBe("this field cannot have keys not specified in the object shape");
        }
    });
    it("may have a binding expression", () => {
        const config = {
            "name" : "checkbox",
            type: "checkbox",
            bind: "to something"
        };
        try {
            checkboxSchema(config).validateSync(config);
        } catch(e) {
            fail(e);
        }
    });
});