const applyEffects = require("../../../project-template/src/main/resources/scripts/reducer/applyEffects").default;
describe("Effect applier", function () {
    let state;
    beforeEach(() => {
        state = {
            transformers: []
        }
    });
    it("applies state transformers in order", function () {
        state.transformers = state.transformers.concat([{
            path: "a",
            action: "SET",
            value: 1
        }, {
            path: "b",
            action: "SET",
            value: 1
        }, {
            path: "c",
            action: "ADD",
            value: 1
        }, {
            path: "c",
            action: "ADD",
            value: 1
        }]);
        applyEffects(state);
        expect(state).toEqual({
            a: 1,
            b: 1,
            c: 2,
            transformers: [{
                path: "a",
                action: "SET",
                value: 1
            }, {
                path: "b",
                action: "SET",
                value: 1
            }, {
                path: "c",
                action: "ADD",
                value: 1
            }, {
                path: "c",
                action: "ADD",
                value: 1
            }]
        });
    });
    describe("evaluates transformer requirements", function () {
        it("evaluates requirement objects", function () {
            state.a = 1;
            state.transformers = state.transformers.concat([{
                path: "$state.a",
                action: "SET",
                value: 1,
                requires: {
                    path: "$state.a",
                    equals: 1
                }
            }]);
            applyEffects(state);
            expect(state).toEqual({
                a: 1,
                transformers: [{
                    path: "$state.a",
                    action: "SET",
                    value: 1,
                    requires: {
                        path: "$state.a",
                        equals: 1
                    }
                }]
            });
        });
        it("removes transformers whose requirements are not met", function () {
            state.transformers = state.transformers.concat([{
                path: "$state.a",
                action: "SET",
                value: 1,
            }, {
                path: "$state.a",
                action: "SET",
                value: 1,
                requires: {
                    path: "$state.a",
                    equals: 1
                }
            }]);
            const newState = {...state};

            applyEffects(state);
            expect(state).toEqual({
                a: 1,
                transformers: [{
                    path: "$state.a",
                    action: "SET",
                    value: 1,
                }, {
                    path: "$state.a",
                    action: "SET",
                    value: 1,
                    requires: {
                        path: "$state.a",
                        equals: 1
                    }
                }]
            });

            newState.transformers.splice(0, 1);
            applyEffects(newState);
            expect(newState).toEqual({
                transformers: []
            })
        });
    });
    it("applies secondary effects", function(){
        state.transformers.push({
            path: "$state.a",
            action: "SET",
            value: {
                effects: [{
                    path: "$state.b",
                    action:"SET",
                    value: 1
                }]
            }
        });
        applyEffects(state);
        expect(state).toEqual({
            a: {
                effects: [{
                    action: "SET",
                    path: "$state.b",
                    value: 1
                }]
            },
            b: 1,
            transformers: [{
                path: "$state.a",
                action: "SET",
                value: {
                    effects: [{
                        path: "$state.b",
                        action: "SET",
                        value: 1
                    }]
                }
            }]
        });
    })
});