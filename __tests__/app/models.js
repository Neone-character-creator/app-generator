class Character {
    constructor(){

    }
}
Character.prototype.definition = {
    age: {
        type: "number",
        default: 0
    },
    name: {
        type:"string",
        default: ""
    }
};

module.exports = {
    character: Character
};