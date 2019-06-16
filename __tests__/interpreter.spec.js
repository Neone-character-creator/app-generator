const Interpreter = require("../project-template/src/main/resources/scripts/interpreter");
describe("embedded interpreter", () => {
    it("can return a number literal", () => {
        const expression = "return 1";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("can return a string literal", () => {
        const expression = "return 'string'";
        expect(Interpreter.interpret(expression, {})).toEqual("'string'");
    });
    it("can return the result of addition", () => {
        const expression = "return 1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(2);
    });
    it("can return the result of multiplication", () => {
        const expression = "return 2*2";
        expect(Interpreter.interpret(expression, {})).toEqual(4);
    });
    it("can return the result of division", () => {
        const expression = "return 2/2";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("can return the result of chained addition", () => {
        const expression = "return 1+1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(3);
    });
    it("resolves state variables", () => {
        const expression = "return $state.foo";
        const context = {
            $state: {
                foo: 1
            }
        };
        expect(Interpreter.interpret(expression, context)).toEqual(context.$state.foo);
    });
    it("resolves nested state variables", () => {
        const expression = "return $state.foo.bar.baz";
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
    it("return undefined if there is no return statement", () => {
        const expression = "1";
        const context = {
        };
        expect(Interpreter.interpret(expression, context)).toBeUndefined();
    });
    it("can call methods", () => {
        const expression = "return $state.join('+')";
        const context = {
            $state: ["foo", "bar"]
        };
        expect(Interpreter.interpret(expression, context)).toEqual("foo+bar");
    })
});