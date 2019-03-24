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
                expect(e).toThrowErrorMatchingSnapshot();
            }
        });
        it("must have a properties object", () => {
            const configuration = {
                model: {
                    character: {
                    }
                }
            };
            expect(() => {
                modelValidation(configuration);
            }).toThrowErrorMatchingSnapshot();
        });
    });
    describe("complex type", () => {
        describe("properties", () => {
            it("may be a simple type without error", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                string: "string",
                                number: "number"
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
                                complex: "complex"
                            }
                        },
                        complex: {
                            properties: {}
                        }
                    }
                };
                modelValidation(configuration)
            });
            it("may be an array of a valid type", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                arrayOfString: ["string"],
                                arrayOfNumber: ["number"],
                                arrayOfComplex: ["type"]
                            }
                        },
                        type: {
                            properties: {}
                        }
                    }
                };
                modelValidation(configuration)
            });
            it("throws an error if a non-existent type is referenced", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                career: "fake"
                            }
                        },
                        real: {
                            properties: {

                            }
                        }
                    }
                };
                expect(() => {
                    modelValidation(configuration)
                }).toThrowErrorMatchingSnapshot();
            });
            it("throws an error if a property is not a string", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                bad: {}
                            }
                        },
                        real: {
                            properties: {

                            }
                        }
                    }
                };
                expect(() => {
                    modelValidation(configuration)
                }).toThrowErrorMatchingSnapshot();
            });
            it("throws an error if a complex type has no properties object", () => {
                const configuration = {
                    model: {
                        character: {
                            properties: {
                                bad: "bad"
                            }
                        },
                        bad: {
                        }
                    }
                };
                expect(() => {
                    modelValidation(configuration)
                }).toThrowErrorMatchingSnapshot();
            });
        });
    });
});