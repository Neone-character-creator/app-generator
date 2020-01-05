import setTempProperty from "../../../project-template/src/main/resources/scripts/reducer/setTempProperty"

describe("temp property setter", function(){
    let state;
    beforeEach(()=>{
        state = {};
    });
    it("can set a temporary property", function(){
        setTempProperty(state, "SET", "foo", 1);
        expect(state.$temp.foo).toBe(1);
    });
    it("it can push a value into an existing array", function(){
        state.$temp = {
            foo: []
        };
        setTempProperty(state, "PUSH", "foo", 1);
        expect(state.$temp.foo).toEqual([1]);
    });
    it("creates an array and pushes it if it is undefined", function(){
        setTempProperty(state, "PUSH", "foo", 1);
        expect(state.$temp.foo).toEqual([1]);
    });
    it("throws an error if trying to push to a value that is already defined buy", function(){
        state.$temp = {
            foo : 1
        };
        expect(()=> {
            setTempProperty(state, "PUSH", "foo", 1);
        }).toThrowErrorMatchingSnapshot();
    });
    it("can remove a value by index from an array", function(){
        state.$temp = {
            foo: [1]
        };
        setTempProperty(state, "REMOVE", "foo", 0);
        expect(state.$temp.foo).toEqual([]);
    });
    it("throws an error if trying to remove from a value that is not an array", function(){
        state.$temp = {
            foo : 1
        };
        expect(()=>{
            setTempProperty(state, "REMOVE", "foo", 0);
        }).toThrowErrorMatchingSnapshot();
    });
});