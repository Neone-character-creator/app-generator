const modelValidation = require("../../../lib/modelValidation");

describe("model generation", () => {
    it("requires a model property", () => {
        const configuration = {};
        expect(() => {
            modelValidation(configuration);
        }).toThrowErrorMatchingSnapshot();
    });
    describe("character model", () => {
        it("must be defined, with at least one property", () => {
            expect.assertions(1);
            try {
                const configuration = {
                    model: {}
                };
                modelValidation(configuration)
            } catch (e) {
                expect(e).toMatchSnapshot();
            }
        });
        it("must have at least one property", () => {
            const configuration = {
                model: {
                    character: {
                    }
                }
            };
            expect(() => {
                modelValidation(configuration);
            }).toMatchSnapshot();
        });
    });
    describe("complex type", () => {
        describe("properties", () => {
            it("may be a string specifying their type", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                name: "string",
                                age: "number"
                            }
                        }
                    }
                };
                modelValidation(configuration)
            });
            it("may reference another complex type", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                career: "career"
                            }
                        },
                        career: {
                            properties: {}
                        }
                    }
                };
                modelValidation(configuration)
            });
            it("may be an array of 'number'", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                age: "number"
                            }
                        }
                    }
                };
                modelValidation(configuration)
            });
            it("throws an error if a non-existent type is referenced", () => {
                const configuration = {
                    model: {
                        character: {
                            career: "fake"
                        },
                        real: {}
                    }
                };
                expect(() => {
                    modelValidation(configuration)
                }).toMatchSnapshot();
            });

        });
    });
});