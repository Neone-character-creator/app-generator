const Interpreter = require("../project-template/src/main/resources/scripts/interpreter").default;
describe("embedded interpreter", () => {
    it("can return a number literal", () => {
        const expression = 1;
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("can return a string literal", () => {
        const expression = "string";
        expect(Interpreter.interpret(expression, {})).toEqual("string");
    });
    it("can return the result of addition", () => {
        const expression = "# 1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(2);
    });
    it("can return the result of multiplication", () => {
        const expression = "# 2*2";
        expect(Interpreter.interpret(expression, {})).toEqual(4);
    });
    it("can return the result of division", () => {
        const expression = "# 2/2";
        expect(Interpreter.interpret(expression, {})).toEqual(1);
    });
    it("can return the result of chained addition", () => {
        const expression = "# 1+1+1";
        expect(Interpreter.interpret(expression, {})).toEqual(3);
    });
    it("resolves state variables", () => {
        const expression = "# $state.foo";
        const context = {
            $state: {
                foo: 1
            }
        };
        expect(Interpreter.interpret(expression, context)).toEqual(context.$state.foo);
    });
    it("resolves nested state variables", () => {
        const expression = "# $state.foo.bar.baz";
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
    it("can call methods", () => {
        const expression = "# $state.join('+')";
        const context = {
            $state: ["foo", "bar"]
        };
        expect(Interpreter.interpret(expression, context)).toEqual("foo+bar");
    });
    it("can interpret a function", () => {
        const expression = "# $state.map(function(x){return Number.parseInt(x)})";
        const context = {
            $state: ["1", "2"]
        };
        expect(Interpreter.interpret(expression, context)).toEqual([1,2]);
    })
});