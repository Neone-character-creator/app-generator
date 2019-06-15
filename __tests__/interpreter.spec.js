const Interpreter = require("../project-template/src/main/resources/scripts/interpreter");
describe("embedded interpreter", () => {
    it("evaluates a number literal to that value", () => {
        const expression = "1";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("evaluates a string literal to that string", () => {
        const expression = "string";
        expect(Interpreter.interpret(expression, {})).toEqual("string");
    });
    it("evaluates addition", () => {
        const expression = "1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(2);
    });
    it("evaluates multiplication", () => {
        const expression = "2*2";
        expect(Interpreter.interpret(expression, {})).toEqual(4);
    });
    it("evaluates division", () => {
        const expression = "2/2";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("rounds down when dividing", () => {
        const expression = "3/2";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("evaluates chained addition", () => {
        const expression = "1+1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(3);
    });
    it("resolves state variables", () => {
        const expression = "$state.foo";
        const context = {
            $state: {
                foo: 1
            }
        };
        expect(Interpreter.interpret(expression, context)).toEqual(context.$state.foo);
    });
    it("resolves nested state variables", () => {
        const expression = "$state.foo.bar.baz";
        const context = {
            $state: {
                foo: {
                    bar: {
                        baz: 12345
                    }
                }
            }
        };
        expect(Interpreter.interpret(expression, context)).toEqual(12345);
    });
});