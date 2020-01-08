const PropertyCalculator = require("../../../project-template/src/main/resources/scripts/reducer/propertyCalculator").default;

describe("property calculator", function(){
    let calculator;
    let model;
    let state;
    beforeEach(()=>{
        calculator = new PropertyCalculator();
        model = {
            character: {
                properties: {
                    name: {
                        type: "string"
                    },
                    age: {
                        type: "number"
                    },
                    nextAge: {
                        type: "number",
                        derivedFrom: [
                            "#$state.character.age + 1"
                        ]
                    },
                    doubleAge: {
                        type: "number",
                        derivedFrom: [
                            "#$state.character.nextAge * 2"
                        ]
                    }
                }
            }
        };
        state = {
            character: {
                name: "name",
                age: 1
            }
        }
    });
    it("return the number of iterations it performs", function(){
        expect(calculator.calculate({type: "character", modelDefinition: model.character}, state, ["character"], {})).toBe(2);
    });
    it("throws an error if more than 2 iterations are performed", function(){
        model.character = {
            properties: {
                a: {
                    type: "number",
                    derivedFrom: ["#$state.character.b + 1"]
                },
                b: {
                    type: "number",
                    derivedFrom: ["#$state.character.a + 1"]
                }
            }
        };
        state.character.a = 1;
        state.character.b = 1;
        expect(()=>{
            calculator.calculate({type: "character", modelDefinition: model.character}, state, ["character"], {})
        }).toThrowErrorMatchingSnapshot();
    });
    it("calculates base values after derived properties", function(){
        calculator.calculate({type: "character", modelDefinition: model.character}, state, ["character"], {});
        expect(state.character.nextAge).toEqual(2)
        expect(state.character.doubleAge).toEqual(4)
    })
});