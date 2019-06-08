const modelSchema = require("../../../lib/schema/model");

describe("model schema", () => {
    it("must have a properties field", () => {
        const config = {};
        expect.assertions(2);
        try {
            modelSchema(config)(config).validateSync(config);
        } catch (e) {
            expect(e.errors.length).toEqual(1);
            expect(e.errors).toContain("properties is a required field");
        }
    });
    it("can have string properties", () => {
        const config = {
            properties: {
                string: "string"
            }
        };
        try {
            const validated = modelSchema(config)(config).validateSync(config);
            expect(validated.properties.string).toEqual({type: "string"});
        } catch (e) {
            fail(e);
        }
    });
    describe("number properties", () => {
        it("can have number properties", () => {
            const config = {
                properties: {
                    number: "number"
                }
            };
            try {
                const validated = modelSchema(config)(config).validateSync(config);
                expect(validated.properties.number).toEqual({type: "number"});
            } catch (e) {
                fail(e);
            }
        });
    });
});