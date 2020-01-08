const DerivedPropertyCalculator = require("../../../project-template/src/main/resources/scripts/reducer/derivedPropertyCalculator").default;

describe("derived property calculator", function () {
    let calculator;
    beforeEach(() => {
        calculator = new DerivedPropertyCalculator();
    });
    it("returns an empty object if the model contains no derived properties", function () {
        const model = {
            character: {
                properties: {
                    name: {type: "string"},
                    age: {type: "number"}
                }
            }
        };
        expect(calculator.calculate({
            type: "character",
            modelDefinition: model.character
        }, [], {
            character: {}
        }, ["character"], {})).toEqual({});
    });
    it("returns an object containing all properties that changed this iteration", function () {
        const model = {
            character: {
                properties: {
                    name: {type: "string"},
                    age: {type: "number"},
                    nextAge: {
                        "type": "number",
                        derivedFrom: ["#$state.character.age + 1"]
                    }
                }
            }
        };
        expect(calculator.calculate({
            type: "character",
            modelDefinition: model.character
        }, [], {
            character: {
                age: 1
            }
        }, ["character"], {})).toEqual({
            "character[nextAge]" : 2
        });
    });
});