const reducer = require("../../../project-template/src/main/resources/scripts/reducer").default;
describe("state reducer", function(){
    it("throws an error if an invalid action type is passed with an existing state", function(){
       expect(()=>{
           reducer({}, {
               type: "FOO"
           });
       }).toThrowErrorMatchingSnapshot();
    });
    it("throws an error if the path does not begin with $state", function(){
        expect(()=>{
            reducer({}, {
                type: "SET",
                path: "foobar"
            });
        }).toThrowErrorMatchingSnapshot();
    });
    it("creates a copy of the previous state", function(){
        const initialState = {};
        const outputState = reducer(initialState, {
            type: "SET",
            path: "$state.foo"
        });
        expect(initialState).not.toEqual(outputState);
    });
});