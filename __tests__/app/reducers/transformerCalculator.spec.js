const transformerCalculator = require("../../../project-template/src/main/resources/scripts/reducer/transformerCalculator").default;

describe("Transformer generator", function () {
    let state;
    beforeEach(() => {
        state = {
            transformers: []
        }
    });
    it("generates a transformer to override a value for a SET", function () {
        transformerCalculator(state, "SET", "", 0);
        expect(state.transformers).toEqual([{
            path: "",
            action: "SET",
            value: 0
        }]);
    });
    it("replace a SET transformer with a new one for the same path", function () {
        transformerCalculator(state, "SET", "", 0);
        transformerCalculator(state, "SET", "", 1);
        expect(state.transformers).toEqual([{
            path: "",
            action: "SET",
            value: 1
        }]);
    });
    it("SET for different paths exist", function () {
        transformerCalculator(state, "SET", "a", 0);
        transformerCalculator(state, "SET", "b", 1);
        expect(state.transformers).toEqual([{
            path: "a",
            action: "SET",
            value: 0
        }, {
            path: "b",
            action: "SET",
            value: 1
        }]);
    });
    it("generates a transformer to insert a value for PUSH", function () {
        state = {
            a: [],
            transformers: []
        };
        transformerCalculator(state, "PUSH", "a", 0);
        expect(state.transformers).toEqual([{
            path: "a",
            action: "PUSH",
            value: 0,
            index: 0
        }]);
    });
    it("multiple PUSH for same path are allowed", function () {
        state = {
            a: [],
            transformers: []
        };
        transformerCalculator(state, "PUSH", "a", 0);
        // Simulate the previous transformer being applied.
        state.a = [0];
        transformerCalculator(state, "PUSH", "a", 0);
        expect(state.transformers).toEqual([{
            path: "a",
            action: "PUSH",
            value: 0,
            index: 0
        }, {
            path: "a",
            action: "PUSH",
            value: 0,
            index: 1
        }]);
    });
    it("REMOVE undoes a PUSH at the same path", function(){
        transformerCalculator(state, "PUSH", "a", 1);
        transformerCalculator(state, "REMOVE", "a", 0)
        expect(state.transformers).toEqual([]);
    })
});