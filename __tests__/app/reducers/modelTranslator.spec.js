const ModelTranslator = require("../../../project-template/src/main/resources/scripts/reducer/modelTranslator").default;
describe("model translator", function () {
    let model;
    beforeEach(()=>{
        model = {};
        model.character = function () {
            this.id = model.character.prototype.id();
            this.name = "";
            this.age = 0;
            this.spouse = null;
            this.children = [];
        };
        model.character.type = "character";
        model.character.prototype._id = 1;
        model.character.prototype.id = function(){
            return "character-" + model.character.prototype._id++;
        };
        model.character.prototype.definition = {
            name: {type: "string"},
            age: {type: "number"},
            children: {type: "[character]"},
            spouse: {type: "character"}
        };
        model.character.values = [];
        model.character.prototype.effects = [];
    });

    describe("with a string action value", function () {
        it("returns the given value if target path has a string type", function () {
            const value = ModelTranslator(model, "character.name", "Damien");
            expect(value).toBe("Damien");
        });
        it("throws an error if the target path does not have a string type", function () {
            expect(() => {
                ModelTranslator(model, "character.age", "Damien");
            }).toThrowErrorMatchingSnapshot();
        });
        it("creates a new instance if the target path has a model type and the value does not match an instance id", function () {
            const value = ModelTranslator(model, "character", "character-1");
            expect(value).toEqual({
                id: "character-1",
                name: "",
                age: 0,
                spouse: null,
                children: [],
                effects: []
            });
            expect(model.character.values).toContainEqual({
                id: "character-1",
                name: "",
                age: 0,
                spouse: null,
                children: [],
                effects: []
            });
        });
        it("performs a lookup if the target path has a model type and the value matches an instance id", function () {
            model.character.values.push({
                id: "character-1",
                name: "",
                age: 0,
                spouse: null,
                children: []
            });
            const value = ModelTranslator(model, "character", "character-1");
            expect(value).toEqual({
                id: "character-1",
                name: "",
                age: 0,
                spouse: null,
                effects: [],
                children: []
            });
            expect(model.character.values).toEqual([{
                id: "character-1",
                name: "",
                age: 0,
                spouse: null,
                effects: [],
                children: []
            }]);
        });
    });
    describe("with a number action value", function () {
        it("returns the given value if target path has a number type", function () {
            const value = ModelTranslator(model, "character.age", 20);
            expect(value).toBe(20);
        });
        it("throws an error if the target path does not have a number type", function () {
            expect(() => {
                ModelTranslator(model, "character.age", "Damien");
            }).toThrowErrorMatchingSnapshot();
        });
    });
});