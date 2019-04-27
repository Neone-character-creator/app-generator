const configSchema = require('../../../lib/schema/configuration');
const textfieldSchema = require("../../../lib/schema/component/textfield");
const checkboxSchema = require("../../../lib/schema/component/checkbox");
const containerSchema = require("../../../lib/schema/component/container");

describe("the configuration schema", () => {
    describe("textfield", () => {
        it("must have a type", () => {
            const config = {};
            expect.assertions(2);
            try {
                textfieldSchema(config).validateSync(config);
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
                textfieldSchema(config).validateSync(config);
            } catch(e) {
                expect(e.errors.length).toEqual(1);
                expect(e.errors[0]).toBe("type must be one of the following values: textfield");
            }
        });
        it("may not have unknown properties", () => {
            const config = {
                type: "textfield",
                foo: "bar"
            };
            expect.assertions(2);
            try {
                textfieldSchema(config).validateSync(config);
            } catch(e) {
                expect(e.errors.length).toEqual(1);
                expect(e.errors[0]).toBe("this field cannot have keys not specified in the object shape");
            }
        });
        it("may have a binding expression", () => {
            const config = {
                type: "textfield",
                bind: "to something"
            };
            try {
                textfieldSchema(config).validateSync(config);
            } catch(e) {
                fail(e);
            }
        });
    });
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
                expect(e.errors[0]).toBe("type must be one of the following values: checkbox");
            }
        });
        it("may not have unknown properties", () => {
            const config = {
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
                containerSchema(config).validateSync(config, {
                    abortEarly: false
                });
            } catch(e) {
                expect(e.errors.length).toBeGreaterThanOrEqual(1);
                expect(e.errors).toContain("type must be one of the following values: container");
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
    describe("the views", () => {
        it("must have a name field", () => {
            const config = {
                views: {
                    children: {
                        summary: {
                            children: {}
                        },
                        one: {
                            children: {}
                        }
                    }
                }
            };
            expect.assertions(3);
            try {
                configSchema(config)
            } catch (e) {
                expect(e.errors.length).toEqual(2);
                expect(e.errors[0]).toBe("views.children.summary.name is a required field");
                expect(e.errors[1]).toBe("views.children.one.name is a required field");
            }
        });
        it("must have children", () => {
            const config = {
                views: {
                    children: {
                        summary: {
                            name: "Summary"
                        },
                        one: {
                            name: "One"
                        }
                    }
                }
            };
            expect.assertions(3);
            try {
                configSchema(config)
            } catch (e) {
                expect(e.errors.length).toEqual(2);
                expect(e.errors[0]).toBe("views.children.summary.children is a required field");
                expect(e.errors[1]).toBe("views.children.one.children is a required field");
            }
        })
    });
});