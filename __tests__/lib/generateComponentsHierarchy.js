const generateComponentsHierarchy = require("../../lib/generateComponentsHierarchy");
describe("the component generator", () => {
    it("generates components based on the views in the config", () => {
        const config = {
            views: {
                children: {
                    "summary": {
                        type: "container",
                        direction: "vertical",
                        children: {
                            "name": {
                                type: "textfield",
                                label: "Character Name",
                                bind: "character.name"
                            },
                            "species": {
                                type: "textfield",
                                label: "Species",
                                bind: "character.species.name"
                            },
                            "career": {
                                type: "textfield",
                                label: "Career",
                                bind: "character.career.name"
                            },
                            "specializations": {
                                type: "textfield",
                                label: "Specialization Trees",
                                bind: "character.specializations | map(name) | join(, )"
                            }
                        }
                    }
                }
            }
        };
        const componentModel = generateComponentsHierarchy(config);
        expect(componentModel).toEqual({
            views: {
                children: ["summary"]
            },
            "summary": {
                type: "container",
                direction: "vertical",
                children: [
                    "name",
                    "species",
                    "career",
                    "specializations"
                ]
            },
            "name": {
                bind: "character.name",
                label: "Character Name",
                type: "textfield",
            },
            "species": {
                bind: "character.species.name",
                label: "Species",
                type: "textfield",
            },
            "career": {
                bind: "character.career.name",
                label: "Career",
                type: "textfield"

            },
            "specializations": {
                bind: "character.specializations | map(name) | join(, )",
                label: "Specialization Trees",
                type: "textfield",
            }
        });
    });
});