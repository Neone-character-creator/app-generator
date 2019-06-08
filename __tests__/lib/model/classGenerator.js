class ClassGenerator {
    constructor(config, species) {

    }
}

describe("class file generator", () => {
    it("can generate classes for model type", () => {
        const config = {
            model: {
                character: {},
                species: {
                    name: "string"
                }
            }
        };
        const generatedClass = new ClassGenerator(config, "species");
    });
});