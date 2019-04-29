const generateComponentsHierarchy = require("../../lib/generateComponentsHierarchy").default;
const fs = require("fs");
describe("the component generator", () => {
    it("generates components based on the views in the config", () => {
       const config = JSON.parse(fs.readFileSync(__dirname + "/../test.json", "UTF-8"));
        const componentModel = generateComponentsHierarchy(config);
        expect(componentModel).toEqual({
            appName: "test",
            views: ["Summary"],
            components: {
                Summary: {
                    name: "Summary",
                    type: "view",
                    direction: "vertical",
                    children: [
                        "biography",
                        "combat",
                        "characteristics",
                        "skills",
                    ]
                },
                biography: {
                    name: "biography",
                    type: "container",
                    direction: "vertical",
                    children: [
                        "name",
                        "species",
                        "career",
                        "specializations"
                    ]
                },
                name: {
                    name: "name",
                    bind: "character.name",
                    label: "Character Name",
                    type: "textfield",
                },
                species: {
                    name: "species",
                    bind: "character.species.name",
                    label: "Species",
                    type: "textfield",
                },
                career: {
                    name: "career",
                    bind: "character.career.name",
                    label: "Career",
                    type: "textfield"

                },
                specializations: {
                    name: "specializations",
                    bind: "character.specializations | map(name) | join(, )",
                    label: "Specialization Trees",
                    type: "textfield",
                },
                combat: {
                    name: "combat",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "soak",
                        "wounds",
                        "strain",
                        "defense"
                    ]
                },
                soak: {
                    name: "soak",
                    type: "number",
                    label: "Soak Value",
                    bind: "character.soak"
                },
                wounds: {
                    name: "wounds",
                    type: "container",
                    direction: "horizontal",
                    label: "Wounds",
                    children: [
                        "currentWounds",
                        "thresholdWounds",
                    ]
                },
                thresholdWounds: {
                    name: "thresholdWounds",
                    type: "number",
                    label: "Threshold",
                    bind: "character.wounds.threshold"
                },
                currentWounds: {
                    name: "currentWounds",
                    type: "number",
                    label: "Current",
                    bind: "character.wounds.current"
                },
                strain: {
                    name: "strain",
                    type: "container",
                    direction: "horizontal",
                    label: "Strain",
                    children: [
                        "strainThreshold",
                        "strainCurrent"
                    ]
                },
                strainThreshold: {
                    name: "strainThreshold",
                    type: "number",
                    label: "Threshold",
                    bind: "character.strain.threshold"
                },
                strainCurrent: {
                    name: "strainCurrent",
                    type: "number",
                    label: "Current",
                    bind: "character.strain.current"
                },
                defense: {
                    name: "defense",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedDefense",
                        "meleeDefense"
                    ]
                },
                rangedDefense: {
                    name: "rangedDefense",
                    type: "number",
                    label: "Ranged",
                    bind: "character.defense.ranged"
                },
                meleeDefense: {
                    name: "meleeDefense",
                    type: "number",
                    label: "Melee",
                    bind: "character.defense.melee"
                },
                characteristics: {
                    name: "characteristics",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "brawn",
                        "agility",
                        "intellect",
                        "cunning",
                        "willpower",
                        "presence"
                    ]
                },
                brawn: {
                    name: "brawn",
                    type: "number",
                    label: "Brawn",
                    bind: "character.characteristics.brawn"
                },
                agility: {
                    name: "agility",
                    type: "number",
                    label: "Agility",
                    bind: "character.characteristics.agility"
                },
                intellect: {
                    name: "intellect",
                    type: "number",
                    label: "Intellect",
                    bind: "character.characteristics.intellect"
                },
                cunning: {
                    name: "cunning",
                    type: "number",
                    label: "Cunning",
                    bind: "character.characteristics.cunning"
                },
                willpower: {
                    name: "willpower",
                    type: "number",
                    label: "Willpower",
                    bind: "character.characteristics.willpower"
                },
                presence: {
                    name: "presence",
                    type: "number",
                    label: "Presence",
                    bind: "character.characteristics.presence"
                },
                skills: {
                    name: "skills",
                    type: "container",
                    label: "Skills",
                    direction: "horizontal",
                    children: [
                        "generalSkills",
                        "combatSkills",
                        "knowledgeSkills",
                        "customSkills"
                    ]
                },
                generalSkills: {
                    name: "generalSkills",
                    type: "container",
                    label: "General Skills",
                    direction: "vertical",
                    children: [
                        "astrogation",
                        "athletics",
                        "charm",
                        "coercion",
                        "computers",
                        "cool",
                        "coordination",
                        "deception",
                        "discipline",
                        "leadership",
                        "mechanics",
                        "medicine",
                        "negotiation",
                        "perception",
                        "pilotingPlanetary",
                        "pilotingSpace",
                        "resilience",
                        "skulduggery",
                        "stealth",
                        "streetwise",
                        "survival",
                        "vigilance"
                    ]
                },
                astrogation: {
                    name: "astrogation",
                    type: "container",
                    direction: "horizontal",
                    children: ["astrogationLabel", "astrogationCareerFlag", "astrogationRating"]
                },
                astrogationLabel: {
                    name: "astrogationLabel",
                    type: "label",
                    value: "Astrogation"
                },
                astrogationCareerFlag: {
                    name: "astrogationCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.astrogation."
                },
                astrogationRating: {
                    name: "astrogationRating",
                    type: "number",
                    bind: "character.skills.astrogation"
                },
                athletics: {
                    name: "athletics",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "athleticsLabel",
                        "athleticsCareerFlag",
                        "athleticsRating"
                    ]
                },
                athleticsLabel: {
                    name: "athleticsLabel",
                    type: "label",
                    value: "Athletics"
                },
                athleticsCareerFlag: {
                    name: "athleticsCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.athletics."
                },
                athleticsRating: {
                    name: "athleticsRating",
                    type: "number",
                    bind: "character.skills.athletics"
                },
                charm: {
                    name: "charm",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "charmLabel",
                        "charmCareerFlag",
                        "charmRating"
                    ]
                },
                charmLabel: {
                    name: "charmLabel",
                    type: "label",
                    value: "Charm"
                },
                charmCareerFlag: {
                    name: "charmCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.charm."
                },
                charmRating: {
                    name: "charmRating",
                    type: "number",
                    bind: "character.skills.charm"
                },
                coercion: {
                    name: "coercion",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coercionLabel",
                        "coercionCareerFlag",
                        "coercionRating"
                    ]
                },
                coercionLabel: {
                    name: "coercionLabel",
                    type: "label",
                    value: "Coercion"
                },
                coercionCareerFlag: {
                    name: "coercionCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.coercion."
                },
                coercionRating: {
                    name: "coercionRating",
                    type: "number",
                    bind: "character.skills.coercion"
                },
                computers: {
                    name: "computers",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "computersLabel",
                        "computersCareerFlag",
                        "computersRating"
                    ]
                },
                computersLabel: {
                    name: "computersLabel",
                    type: "label",
                    value: "Computers"
                },
                computersCareerFlag: {
                    name: "computersCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.computers."
                },
                computersRating: {
                    name: "computersRating",
                    type: "number",
                    bind: "character.skills.computers"
                },
                cool: {
                    name: "cool",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coolLabel",
                        "coolCareerFlag",
                        "coolRating"
                    ]
                },
                coolLabel: {
                    name: "coolLabel",
                    type: "label",
                    value: "Cool"
                },
                coolCareerFlag: {
                    name: "coolCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.cool."
                },
                coolRating: {
                    name: "coolRating",
                    type: "number",
                    bind: "character.skills.cool"
                },
                coordination: {
                    name: "coordination",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coordinationLabel",
                        "coordinationCareerFlag",
                        "coordinationRating"
                    ]
                },
                coordinationLabel: {
                    name: "coordinationLabel",
                    type: "label",
                    value: "Coordination"
                },
                coordinationCareerFlag: {
                    name: "coordinationCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.coordination."
                },
                coordinationRating: {
                    name: "coordinationRating",
                    type: "number",
                    bind: "character.skills.coordination"
                },
                deception: {
                    name: "deception",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "deceptionLabel",
                        "deceptionCareerFlag",
                        "deceptionRating"
                    ]
                },
                deceptionLabel: {
                    name: "deceptionLabel",
                    type: "label",
                    value: "Deception"
                },
                deceptionCareerFlag: {
                    name: "deceptionCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.deception."
                },
                deceptionRating: {
                    name: "deceptionRating",
                    type: "number",
                    bind: "character.skills.deception"
                },
                discipline: {
                    name: "discipline",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "disciplineLabel",
                        "disciplineCareerFlag",
                        "disciplineRating"
                    ]
                },
                disciplineLabel: {
                    name: "disciplineLabel",
                    type: "label",
                    value: "Discipline"
                },
                disciplineCareerFlag: {
                    name: "disciplineCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.discipline."
                },
                disciplineRating: {
                    name: "disciplineRating",
                    type: "number",
                    bind: "character.skills.discipline"
                },
                leadership: {
                    name: "leadership",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "leadershipLabel",
                        "leadershipCareerFlag",
                        "leadershipRating"
                    ]
                },
                leadershipLabel: {
                    name: "leadershipLabel",
                    type: "label",
                    value: "Leadership"
                },
                leadershipCareerFlag: {
                    name: "leadershipCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.leadership."
                },
                leadershipRating: {
                    name: "leadershipRating",
                    type: "number",
                    bind: "character.skills.leadership"
                },
                mechanics: {
                    name: "mechanics",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "mechanicsLabel",
                        "mechanicsCareerFlag",
                        "mechanicsRating"
                    ]
                },
                mechanicsLabel: {
                    name: "mechanicsLabel",
                    type: "label",
                    value: "Mechanics"
                },
                mechanicsCareerFlag: {
                    name: "mechanicsCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.mechanics."
                },
                mechanicsRating: {
                    name: "mechanicsRating",
                    type: "number",
                    bind: "character.skills.mechanics"
                },
                medicine: {
                    name: "medicine",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "medicineLabel",
                        "medicineCareerFlag",
                        "medicineRating"
                    ]
                },
                medicineLabel: {
                    name: "medicineLabel",
                    type: "label",
                    value: "Medicine"
                },
                medicineCareerFlag: {
                    name: "medicineCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.medicine."
                },
                medicineRating: {
                    name: "medicineRating",
                    type: "number",
                    bind: "character.skills.medicine"
                },
                negotiation: {
                    name: "negotiation",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "negotiationLabel",
                        "negotiationCareerFlag",
                        "negotiationRating"
                    ]
                },
                negotiationLabel: {
                    name: "negotiationLabel",
                    type: "label",
                    value: "Negotiation"
                },
                negotiationCareerFlag: {
                    name: "negotiationCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.negotiation."
                },
                negotiationRating: {
                    name: "negotiationRating",
                    type: "number",
                    bind: "character.skills.negotiation"
                },
                perception: {
                    name: "perception",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "perceptionLabel",
                        "perceptionCareerFlag",
                        "perceptionRating"
                    ]
                },
                perceptionLabel: {
                    name: "perceptionLabel",
                    type: "label",
                    value: "Perception"
                },
                perceptionCareerFlag: {
                    name: "perceptionCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.perception."
                },
                perceptionRating: {
                    name: "perceptionRating",
                    type: "number",
                    bind: "character.skills.perception"
                },
                pilotingPlanetary: {
                    name: "pilotingPlanetary",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "pilotingPlanetaryLabel",
                        "pilotingPlanetaryCareerFlag",
                        "pilotingPlanetaryRating"
                    ]
                },
                pilotingPlanetaryLabel: {
                    name: "pilotingPlanetaryLabel",
                    type: "label",
                    value: "PilotingPlanetary"
                },
                pilotingPlanetaryCareerFlag: {
                    name: "pilotingPlanetaryCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.pilotingPlanetary."
                },
                pilotingPlanetaryRating: {
                    name: "pilotingPlanetaryRating",
                    type: "number",
                    bind: "character.skills.pilotingPlanetary"
                },
                pilotingSpace: {
                    name: "pilotingSpace",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "pilotingSpaceLabel",
                        "pilotingSpaceCareerFlag",
                        "pilotingSpaceRating"
                    ]
                },
                pilotingSpaceLabel: {
                    name: "pilotingSpaceLabel",
                    type: "label",
                    value: "PilotingSpace"
                },
                pilotingSpaceCareerFlag: {
                    name: "pilotingSpaceCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.pilotingSpace."
                },
                pilotingSpaceRating: {
                    name: "pilotingSpaceRating",
                    type: "number",
                    bind: "character.skills.pilotingSpace"
                },
                resilience: {
                    name: "resilience",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "resilienceLabel",
                        "resilienceCareerFlag",
                        "resilienceRating"
                    ]
                },
                resilienceLabel: {
                    name: "resilienceLabel",
                    type: "label",
                    value: "Resilience"
                },
                resilienceCareerFlag: {
                    name: "resilienceCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.resilience."
                },
                resilienceRating: {
                    name: "resilienceRating",
                    type: "number",
                    bind: "character.skills.resilience"
                },
                skulduggery: {
                    name: "skulduggery",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "skulduggeryLabel",
                        "skulduggeryCareerFlag",
                        "skulduggeryRating"
                    ]
                },
                skulduggeryLabel: {
                    name: "skulduggeryLabel",
                    type: "label",
                    value: "Skulduggery"
                },
                skulduggeryCareerFlag: {
                    name: "skulduggeryCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.skulduggery."
                },
                skulduggeryRating: {
                    name: "skulduggeryRating",
                    type: "number",
                    bind: "character.skills.skulduggery"
                },
                stealth: {
                    name: "stealth",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "stealthLabel",
                        "stealthCareerFlag",
                        "stealthRating"
                    ]
                },
                stealthLabel: {
                    name: "stealthLabel",
                    type: "label",
                    value: "Stealth"
                },
                stealthCareerFlag: {
                    name: "stealthCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.stealth."
                },
                stealthRating: {
                    name: "stealthRating",
                    type: "number",
                    bind: "character.skills.stealth"
                },
                streetwise: {
                    name: "streetwise",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "streetwiseLabel",
                        "streetwiseCareerFlag",
                        "streetwiseRating"
                    ]
                },
                streetwiseLabel: {
                    name: "streetwiseLabel",
                    type: "label",
                    value: "Streetwise"
                },
                streetwiseCareerFlag: {
                    name: "streetwiseCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.streetwise."
                },
                streetwiseRating: {
                    name: "streetwiseRating",
                    type: "number",
                    bind: "character.skills.streetwise"
                },
                survival: {
                    name: "survival",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "survivalLabel",
                        "survivalCareerFlag",
                        "survivalRating"
                    ]
                },
                survivalLabel: {
                    name: "survivalLabel",
                    type: "label",
                    value: "Survival"
                },
                survivalCareerFlag: {
                    name: "survivalCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.survival."
                },
                survivalRating: {
                    name: "survivalRating",
                    type: "number",
                    bind: "character.skills.survival"
                },
                vigilance: {
                    name: "vigilance",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "vigilanceLabel",
                        "vigilanceCareerFlag",
                        "vigilanceRating"
                    ]
                },
                vigilanceLabel: {
                    name: "vigilanceLabel",
                    type: "label",
                    value: "Vigilance"
                },
                vigilanceCareerFlag: {
                    name: "vigilanceCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.vigilance."
                },
                vigilanceRating: {
                    name: "vigilanceRating",
                    type: "number",
                    bind: "character.skills.vigilance"
                },
                combatSkills: {
                    name: "combatSkills",
                    type: "container",
                    direction: "vertical",
                    children: [
                        "brawl",
                        "gunnery",
                        "melee",
                        "rangedLight",
                        "rangedHeavy"
                    ]
                },
                brawl: {
                    name: "brawl",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "brawlLabel",
                        "brawlCareerFlag",
                        "brawlRating"
                    ]
                },
                brawlLabel: {
                    name: "brawlLabel",
                    type: "label",
                    value: "Brawl"
                },
                brawlCareerFlag: {
                    name: "brawlCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.brawl."
                },
                brawlRating: {
                    name: "brawlRating",
                    type: "number",
                    bind: "character.skills.brawl"
                },
                gunnery: {
                    name: "gunnery",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "gunneryLabel",
                        "gunneryCareerFlag",
                        "gunneryRating"
                    ]
                },
                gunneryLabel: {
                    name: "gunneryLabel",
                    type: "label",
                    value: "Gunnery"
                },
                gunneryCareerFlag: {
                    name: "gunneryCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.gunnery."
                },
                gunneryRating: {
                    name: "gunneryRating",
                    type: "number",
                    bind: "character.skills.gunnery"
                },
                melee: {
                    name: "melee",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "meleeLabel",
                        "meleeCareerFlag",
                        "meleeRating"
                    ]
                },
                meleeLabel: {
                    name: "meleeLabel",
                    type: "label",
                    value: "Melee"
                },
                meleeCareerFlag: {
                    name: "meleeCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.melee."
                },
                meleeRating: {
                    name: "meleeRating",
                    type: "number",
                    bind: "character.skills.melee"
                },
                rangedLight: {
                    name: "rangedLight",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedLightLabel",
                        "rangedLightCareerFlag",
                        "rangedLightRating"
                    ]
                },
                rangedLightLabel: {
                    name: "rangedLightLabel",
                    type: "label",
                    value: "Ranged - Light"
                },
                rangedLightCareerFlag: {
                    name: "rangedLightCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.rangedLight."
                },
                rangedLightRating: {
                    name: "rangedLightRating",
                    type: "number",
                    bind: "character.skills.rangedLight"
                },
                rangedHeavy: {
                    name: "rangedHeavy",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedHeavyLabel",
                        "rangedHeavyCareerFlag",
                        "rangedHeavyRating"
                    ]
                },
                rangedHeavyLabel: {
                    name: "rangedHeavyLabel",
                    type: "label",
                    value: "Ranged - Heavy"
                },
                rangedHeavyCareerFlag: {
                    name: "rangedHeavyCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.rangedHeavy."
                },
                rangedHeavyRating: {
                    name: "rangedHeavyRating",
                    type: "number",
                    bind: "character.skills.rangedHeavy"
                },
                knowledgeSkills: {
                    name: "knowledgeSkills",
                    type: "container",
                    label: "Knowledge Skills",
                    direction: "vertical",
                    children: [
                        "coreWorlds",
                        "education",
                        "lore",
                        "outerRim",
                        "underworld",
                        "xenology",
                        "other"
                    ]
                },
                coreWorlds: {
                    name: "coreWorlds",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coreWorldsLabel",
                        "coreWorldsCareerFlag",
                        "coreWorldsRating"
                    ]
                },
                coreWorldsLabel: {
                    name: "coreWorldsLabel",
                    type: "label",
                    value: "CoreWorlds"
                },
                coreWorldsCareerFlag: {
                    name: "coreWorldsCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.coreWorlds."
                },
                coreWorldsRating: {
                    name: "coreWorldsRating",
                    type: "number",
                    bind: "character.skills.coreWorlds"
                },
                education: {
                    name: "education",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "educationLabel",
                        "educationCareerFlag",
                        "educationRating"
                    ]
                },
                educationLabel: {
                    name: "educationLabel",
                    type: "label",
                    value: "Education"
                },
                educationCareerFlag: {
                    name: "educationCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.education."
                },
                educationRating: {
                    name: "educationRating",
                    type: "number",
                    bind: "character.skills.education"
                },
                lore: {
                    name: "lore",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "loreLabel",
                        "loreCareerFlag",
                        "loreRating"
                    ]
                },
                loreLabel: {
                    name: "loreLabel",
                    type: "label",
                    value: "Lore"
                },
                loreCareerFlag: {
                    name: "loreCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.lore."
                },
                loreRating: {
                    name: "loreRating",
                    type: "number",
                    bind: "character.skills.lore"
                },
                outerRim: {
                    name: "outerRim",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "outerRimLabel",
                        "outerRimCareerFlag",
                        "outerRimRating"
                    ]
                },
                outerRimLabel: {
                    name: "outerRimLabel",
                    type: "label",
                    value: "OuterRim"
                },
                outerRimCareerFlag: {
                    name: "outerRimCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.outerRim."
                },
                outerRimRating: {
                    name: "outerRimRating",
                    type: "number",
                    bind: "character.skills.outerRim"
                },
                underworld: {
                    name: "underworld",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "underworldLabel",
                        "underworldCareerFlag",
                        "underworldRating"
                    ]
                },
                underworldLabel: {
                    name: "underworldLabel",
                    type: "label",
                    value: "Underworld"
                },
                underworldCareerFlag: {
                    name: "underworldCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.underworld."
                },
                underworldRating: {
                    name: "underworldRating",
                    type: "number",
                    bind: "character.skills.underworld"
                },
                xenology: {
                    name: "xenology",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "xenologyLabel",
                        "xenologyCareerFlag",
                        "xenologyRating"
                    ]
                },
                xenologyLabel: {
                    name: "xenologyLabel",
                    type: "label",
                    value: "Xenology"
                },
                xenologyCareerFlag: {
                    name: "xenologyCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.xenology."
                },
                xenologyRating: {
                    name: "xenologyRating",
                    type: "number",
                    bind: "character.skills.xenology"
                },
                other: {
                    name: "other",
                    type: "container",
                    direction: "horizontal",
                    children: ["otherLabel", "otherCareerFlag", "otherRating"]
                },
                otherLabel: {
                    name: "otherLabel",
                    type: "label",
                    value: "Other"
                },
                otherCareerFlag: {
                    name: "otherCareerFlag",
                    type: "checkbox",
                    bind: "character.skills.other."
                },
                otherRating: {
                    name: "otherRating",
                    type: "number",
                    bind: "character.skills.other"
                },

                customSkills: {
                    name: "customSkills",
                    type: "container",
                    direction: "vertical",
                    children: [
                        "custom1",
                        "custom2",
                        "custom3",
                        "custom4",
                        "custom5",
                        "custom6",
                    ]
                },
                custom1: {
                    name: "custom1",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom1Label",
                        "custom1CareerFlag",
                        "custom1Rating"
                    ]
                },
                custom1Label: {
                    name: "custom1Label",
                    type: "label",
                    value: "Custom1"
                },
                custom1CareerFlag: {
                    name: "custom1CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom1."
                },
                custom1Rating: {
                    name: "custom1Rating",
                    type: "number",
                    bind: "character.skills.custom1"
                },
                custom2: {
                    name: "custom2",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom2Label",
                        "custom2CareerFlag",
                        "custom2Rating"
                    ]
                },
                custom2Label: {
                    name: "custom2Label",
                    type: "label",
                    value: "Custom2"
                },
                custom2CareerFlag: {
                    name: "custom2CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom2."
                },
                custom2Rating: {
                    name: "custom2Rating",
                    type: "number",
                    bind: "character.skills.custom2"
                },
                custom3: {
                    name: "custom3",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom3Label",
                        "custom3CareerFlag",
                        "custom3Rating"
                    ]
                },
                custom3Label: {
                    name: "custom3Label",
                    type: "label",
                    value: "Custom3"
                },
                custom3CareerFlag: {
                    name: "custom3CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom3."
                },
                custom3Rating: {
                    name: "custom3Rating",
                    type: "number",
                    bind: "character.skills.custom3"
                },
                custom4: {
                    name: "custom4",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom4Label",
                        "custom4CareerFlag",
                        "custom4Rating"
                    ]
                },
                custom4Label: {
                    name: "custom4Label",
                    type: "label",
                    value: "Custom4"
                },
                custom4CareerFlag: {
                    name: "custom4CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom4."
                },
                custom4Rating: {
                    name: "custom4Rating",
                    type: "number",
                    bind: "character.skills.custom4"
                },
                custom5: {
                    name: "custom5",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom5Label",
                        "custom5CareerFlag",
                        "custom5Rating"
                    ]
                },
                custom5Label: {
                    name: "custom5Label",
                    type: "label",
                    value: "Custom5"
                },
                custom5CareerFlag: {
                    name: "custom5CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom5."
                },
                custom5Rating: {
                    name: "custom5Rating",
                    type: "number",
                    bind: "character.skills.custom5"
                },
                custom6: {
                    name: "custom6",
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom6Label",
                        "custom6CareerFlag",
                        "custom6Rating"
                    ]
                },
                custom6Label: {
                    name: "custom6Label",
                    type: "label",
                    value: "Custom6"
                },
                custom6CareerFlag: {
                    name: "custom6CareerFlag",
                    type: "checkbox",
                    bind: "character.skills.custom6."
                },
                custom6Rating: {
                    name: "custom6Rating",
                    type: "number",
                    bind: "character.skills.custom6"
                },
            },
            model: {
                character: {
                    properties: {
                        career: "career",
                        species: "species",
                        name: "string",
                        soak: "number",
                        specializations: "[specialization]",
                        strain: {
                            current: "number",
                            threshold: "number"
                        },
                        wounds: {
                            current: "number",
                            threshold: "number"
                        }
                    }
                }
            }
        });
    })
    ;
})
;