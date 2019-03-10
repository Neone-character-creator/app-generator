const generateComponentsHierarchy = require("../../lib/generateComponentsHierarchy").default;
describe("the component generator", () => {
    it("generates components based on the views in the config", () => {
        const config = {
            views: {
                children: {
                    "summary": {
                        type: "container",
                        direction: "vertical",
                        children: {
                            biography: {
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
                            },
                            combat: {
                                type: "container",
                                direction: "horizontal",
                                children: {
                                    soak: {
                                        type: "number",
                                        label: "Soak Value",
                                        bind: "character.soak"
                                    },
                                    wounds: {
                                        type: "container",
                                        direction: "horizontal",
                                        label: "Wounds",
                                        children: {
                                            currentWounds: {
                                                type: "number",
                                                label: "Current",
                                                bind: "character.wounds.current"
                                            },
                                            thresholdWounds: {
                                                type: "number",
                                                label: "Threshold",
                                                bind: "character.wounds.threshold"
                                            }
                                        }
                                    },
                                    strain: {
                                        type: "container",
                                        direction: "horizontal",
                                        label: "Strain",
                                        children: {
                                            thresholdStrain: {
                                                type: "number",
                                                label: "Threshold",
                                                bind: "character.strain.threshold"
                                            },
                                            currentStrain: {
                                                type: "number",
                                                label: "Current",
                                                bind: "character.strain.current"
                                            },
                                        }
                                    },
                                    defense: {
                                        type: "container",
                                        direction: "horizontal",
                                        children: {
                                            rangedDefense: {
                                                type: "number",
                                                label: "Ranged",
                                                bind: "character.defense.ranged"
                                            },
                                            meleeDefense: {
                                                type: "number",
                                                label: "Melee",
                                                bind: "character.defense.melee"
                                            }
                                        }
                                    }
                                }
                            },
                            characteristics: {
                                type: "container",
                                direction: "horizontal",
                                children: {
                                    brawn: {
                                        type: "number",
                                        label: "Brawn",
                                        bind: "character.characteristics.brawn"
                                    },
                                    agility: {
                                        type: "number",
                                        label: "Agility",
                                        bind: "character.characteristics.agility"
                                    },
                                    intellect: {
                                        type: "number",
                                        label: "Intellect",
                                        bind: "character.characteristics.intellect"
                                    },
                                    cunning: {
                                        type: "number",
                                        label: "Cunning",
                                        bind: "character.characteristics.cunning"
                                    },
                                    willpower: {
                                        type: "number",
                                        label: "Willpower",
                                        bind: "character.characteristics.willpower"
                                    },
                                    presence: {
                                        type: "number",
                                        label: "Presence",
                                        bind: "character.characteristics.presence"
                                    }
                                }
                            },
                            skills: {
                                type: "container",
                                direction: "horizontal",
                                label: "Skills",
                                children: {
                                    generalSkills: {
                                        type: "container",
                                        direction: "vertical",
                                        label: "General Skills",
                                        children: {
                                            astrogation: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    astrogationLabel: {
                                                        type: "text",
                                                        value: "Astrogation"
                                                    },
                                                    astrogationCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.astrogation."
                                                    },
                                                    astrogationRating: {
                                                        type: "number",
                                                        bind: "character.skills.astrogation"
                                                    }
                                                }
                                            },
                                            athletics: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    athleticsLabel: {
                                                        type: "text",
                                                        value: "Athletics"
                                                    },
                                                    athleticsCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.athletics."
                                                    },
                                                    athleticsRating: {
                                                        type: "number",
                                                        bind: "character.skills.athletics"
                                                    }
                                                }
                                            },
                                            charm: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    charmLabel: {
                                                        type: "text",
                                                        value: "Charm"
                                                    },
                                                    charmCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.charm."
                                                    },
                                                    charmRating: {
                                                        type: "number",
                                                        bind: "character.skills.charm"
                                                    }
                                                }
                                            },
                                            coercion: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    coercionLabel: {
                                                        type: "text",
                                                        value: "Coercion"
                                                    },
                                                    coercionCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.coercion."
                                                    },
                                                    coercionRating: {
                                                        type: "number",
                                                        bind: "character.skills.coercion"
                                                    }
                                                }
                                            },
                                            computers: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    computersLabel: {
                                                        type: "text",
                                                        value: "Computers"
                                                    },
                                                    computersCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.computers."
                                                    },
                                                    computersRating: {
                                                        type: "number",
                                                        bind: "character.skills.computers"
                                                    }
                                                }
                                            },
                                            cool: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    coolLabel: {
                                                        type: "text",
                                                        value: "Cool"
                                                    },
                                                    coolCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.cool."
                                                    },
                                                    coolRating: {
                                                        type: "number",
                                                        bind: "character.skills.cool"
                                                    }
                                                }
                                            },
                                            coordination: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    coordinationLabel: {
                                                        type: "text",
                                                        value: "Coordination"
                                                    },
                                                    coordinationCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.coordination."
                                                    },
                                                    coordinationRating: {
                                                        type: "number",
                                                        bind: "character.skills.coordination"
                                                    }
                                                }
                                            },
                                            deception: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    deceptionLabel: {
                                                        type: "text",
                                                        value: "Deception"
                                                    },
                                                    deceptionCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.deception."
                                                    },
                                                    deceptionRating: {
                                                        type: "number",
                                                        bind: "character.skills.deception"
                                                    }
                                                }
                                            },
                                            discipline: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    disciplineLabel: {
                                                        type: "text",
                                                        value: "Discipline"
                                                    },
                                                    disciplineCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.discipline."
                                                    },
                                                    disciplineRating: {
                                                        type: "number",
                                                        bind: "character.skills.discipline"
                                                    }
                                                }
                                            },
                                            leadership: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    leadershipLabel: {
                                                        type: "text",
                                                        value: "Leadership"
                                                    },
                                                    leadershipCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.leadership."
                                                    },
                                                    leadershipRating: {
                                                        type: "number",
                                                        bind: "character.skills.leadership"
                                                    }
                                                }
                                            },
                                            mechanics: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    mechanicsLabel: {
                                                        type: "text",
                                                        value: "Mechanics"
                                                    },
                                                    mechanicsCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.mechanics."
                                                    },
                                                    mechanicsRating: {
                                                        type: "number",
                                                        bind: "character.skills.mechanics"
                                                    }
                                                }
                                            },
                                            medicine: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    medicineLabel: {
                                                        type: "text",
                                                        value: "Medicine"
                                                    },
                                                    medicineCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.medicine."
                                                    },
                                                    medicineRating: {
                                                        type: "number",
                                                        bind: "character.skills.medicine"
                                                    }
                                                }
                                            },
                                            negotiation: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    negotiationLabel: {
                                                        type: "text",
                                                        value: "Negotiation"
                                                    },
                                                    negotiationCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.negotiation."
                                                    },
                                                    negotiationRating: {
                                                        type: "number",
                                                        bind: "character.skills.negotiation"
                                                    }
                                                }
                                            },
                                            perception: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    perceptionLabel: {
                                                        type: "text",
                                                        value: "Perception"
                                                    },
                                                    perceptionCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.perception."
                                                    },
                                                    perceptionRating: {
                                                        type: "number",
                                                        bind: "character.skills.perception"
                                                    }
                                                }
                                            },
                                            pilotingPlanetary: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    pilotingPlanetaryLabel: {
                                                        type: "text",
                                                        value: "PilotingPlanetary"
                                                    },
                                                    pilotingPlanetaryCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.pilotingPlanetary."
                                                    },
                                                    pilotingPlanetaryRating: {
                                                        type: "number",
                                                        bind: "character.skills.pilotingPlanetary"
                                                    }
                                                }
                                            },
                                            pilotingSpace: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    pilotingSpaceLabel: {
                                                        type: "text",
                                                        value: "PilotingSpace"
                                                    },
                                                    pilotingSpaceCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.pilotingSpace."
                                                    },
                                                    pilotingSpaceRating: {
                                                        type: "number",
                                                        bind: "character.skills.pilotingSpace"
                                                    }
                                                }
                                            },
                                            resilience: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    resilienceLabel: {
                                                        type: "text",
                                                        value: "Resilience"
                                                    },
                                                    resilienceCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.resilience."
                                                    },
                                                    resilienceRating: {
                                                        type: "number",
                                                        bind: "character.skills.resilience"
                                                    }
                                                }
                                            },
                                            skulduggery: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    skulduggeryLabel: {
                                                        type: "text",
                                                        value: "Skulduggery"
                                                    },
                                                    skulduggeryCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.skulduggery."
                                                    },
                                                    skulduggeryRating: {
                                                        type: "number",
                                                        bind: "character.skills.skulduggery"
                                                    }
                                                }
                                            },
                                            stealth: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    stealthLabel: {
                                                        type: "text",
                                                        value: "Stealth"
                                                    },
                                                    stealthCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.stealth."
                                                    },
                                                    stealthRating: {
                                                        type: "number",
                                                        bind: "character.skills.stealth"
                                                    }
                                                }
                                            },
                                            streetwise: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    streetwiseLabel: {
                                                        type: "text",
                                                        value: "Streetwise"
                                                    },
                                                    streetwiseCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.streetwise."
                                                    },
                                                    streetwiseRating: {
                                                        type: "number",
                                                        bind: "character.skills.streetwise"
                                                    }
                                                }
                                            },
                                            survival: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    survivalLabel: {
                                                        type: "text",
                                                        value: "Survival"
                                                    },
                                                    survivalCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.survival."
                                                    },
                                                    survivalRating: {
                                                        type: "number",
                                                        bind: "character.skills.survival"
                                                    }
                                                }
                                            },
                                            vigilance: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    vigilanceLabel: {
                                                        type: "text",
                                                        value: "Vigilance"
                                                    },
                                                    vigilanceCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.vigilance."
                                                    },
                                                    vigilanceRating: {
                                                        type: "number",
                                                        bind: "character.skills.vigilance"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    combatSkills: {
                                        type: "container",
                                        direction: "vertical",
                                        children: {
                                            brawl: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    brawlLabel: {
                                                        type: "text",
                                                        value: "Brawl"
                                                    },
                                                    brawlCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.brawl."
                                                    },
                                                    brawlRating: {
                                                        type: "number",
                                                        bind: "character.skills.brawl"
                                                    }
                                                }
                                            },
                                            gunnery: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    gunneryLabel: {
                                                        type: "text",
                                                        value: "Gunnery"
                                                    },
                                                    gunneryCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.gunnery."
                                                    },
                                                    gunneryRating: {
                                                        type: "number",
                                                        bind: "character.skills.gunnery"
                                                    }
                                                }
                                            },
                                            melee: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    meleeLabel: {
                                                        type: "text",
                                                        value: "Melee"
                                                    },
                                                    meleeCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.melee."
                                                    },
                                                    meleeRating: {
                                                        type: "number",
                                                        bind: "character.skills.melee"
                                                    }
                                                }
                                            },
                                            rangedLight: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    rangedLightLabel: {
                                                        type: "text",
                                                        value: "Ranged - Light"
                                                    },
                                                    rangedLightCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.rangedLight."
                                                    },
                                                    rangedLightRating: {
                                                        type: "number",
                                                        bind: "character.skills.rangedLight"
                                                    }
                                                }
                                            },
                                            rangedHeavy: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    rangedHeavyLabel: {
                                                        type: "text",
                                                        value: "Ranged - Heavy"
                                                    },
                                                    rangedHeavyCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.rangedHeavy."
                                                    },
                                                    rangedHeavyRating: {
                                                        type: "number",
                                                        bind: "character.skills.rangedHeavy"
                                                    }
                                                }
                                            },
                                        }
                                    },
                                    knowledgeSkills: {
                                        type: "container",
                                        direction: "vertical",
                                        label: "Knowledge Skills",
                                        children: {
                                            coreWorlds: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    coreWorldsLabel: {
                                                        type: "text",
                                                        value: "CoreWorlds"
                                                    },
                                                    coreWorldsCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.coreWorlds."
                                                    },
                                                    coreWorldsRating: {
                                                        type: "number",
                                                        bind: "character.skills.coreWorlds"
                                                    }
                                                }
                                            },
                                            education: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    educationLabel: {
                                                        type: "text",
                                                        value: "Education"
                                                    },
                                                    educationCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.education."
                                                    },
                                                    educationRating: {
                                                        type: "number",
                                                        bind: "character.skills.education"
                                                    }
                                                }
                                            },
                                            lore: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    loreLabel: {
                                                        type: "text",
                                                        value: "Lore"
                                                    },
                                                    loreCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.lore."
                                                    },
                                                    loreRating: {
                                                        type: "number",
                                                        bind: "character.skills.lore"
                                                    }
                                                }
                                            },
                                            outerRim: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    outerRimLabel: {
                                                        type: "text",
                                                        value: "OuterRim"
                                                    },
                                                    outerRimCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.outerRim."
                                                    },
                                                    outerRimRating: {
                                                        type: "number",
                                                        bind: "character.skills.outerRim"
                                                    }
                                                }
                                            },
                                            underworld: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    underworldLabel: {
                                                        type: "text",
                                                        value: "Underworld"
                                                    },
                                                    underworldCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.underworld."
                                                    },
                                                    underworldRating: {
                                                        type: "number",
                                                        bind: "character.skills.underworld"
                                                    }
                                                }
                                            },
                                            xenology: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    xenologyLabel: {
                                                        type: "text",
                                                        value: "Xenology"
                                                    },
                                                    xenologyCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.xenology."
                                                    },
                                                    xenologyRating: {
                                                        type: "number",
                                                        bind: "character.skills.xenology"
                                                    }
                                                }
                                            },
                                            other: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    otherLabel: {
                                                        type: "text",
                                                        value: "Other"
                                                    },
                                                    otherCareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.other."
                                                    },
                                                    otherRating: {
                                                        type: "number",
                                                        bind: "character.skills.other"
                                                    }
                                                }
                                            },
                                        }
                                    },
                                    customSkills: {
                                        type: "container",
                                        direction: "vertical",
                                        children: {
                                            custom1: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom1Label: {
                                                        type: "text",
                                                        value: "Custom1"
                                                    },
                                                    custom1CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom1."
                                                    },
                                                    custom1Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom1"
                                                    }
                                                }
                                            },
                                            custom2: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom2Label: {
                                                        type: "text",
                                                        value: "Custom2"
                                                    },
                                                    custom2CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom2."
                                                    },
                                                    custom2Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom2"
                                                    }
                                                }
                                            },
                                            custom3: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom3Label: {
                                                        type: "text",
                                                        value: "Custom3"
                                                    },
                                                    custom3CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom3."
                                                    },
                                                    custom3Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom3"
                                                    }
                                                }
                                            },
                                            custom4: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom4Label: {
                                                        type: "text",
                                                        value: "Custom4"
                                                    },
                                                    custom4CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom4."
                                                    },
                                                    custom4Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom4"
                                                    }
                                                }
                                            },
                                            custom5: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom5Label: {
                                                        type: "text",
                                                        value: "Custom5"
                                                    },
                                                    custom5CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom5."
                                                    },
                                                    custom5Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom5"
                                                    }
                                                }
                                            },
                                            custom6: {
                                                type: "container",
                                                direction: "horizontal",
                                                children: {
                                                    custom6Label: {
                                                        type: "text",
                                                        value: "Custom6"
                                                    },
                                                    custom6CareerFlag: {
                                                        type: "checkbox",
                                                        bind: "character.skills.custom6."
                                                    },
                                                    custom6Rating: {
                                                        type: "number",
                                                        bind: "character.skills.custom6"
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            }
        };
        const componentModel = generateComponentsHierarchy(config);
        expect(componentModel).toEqual({
            views: {
                "summary": {
                    type: "container",
                    direction: "vertical",
                    children: [
                        "biography",
                        "combat",
                        "characteristics",
                        "skills",
                    ]
                }
            },
            components: {
                "summary": {
                    type: "container",
                    direction: "vertical",
                    children: [
                        "biography",
                        "combat",
                        "characteristics",
                        "skills",
                    ]
                },
                biography: {
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
                    bind: "character.name",
                    label: "Character Name",
                    type: "textfield",
                },
                species: {
                    bind: "character.species.name",
                    label: "Species",
                    type: "textfield",
                },
                career: {
                    bind: "character.career.name",
                    label: "Career",
                    type: "textfield"

                },
                specializations: {
                    bind: "character.specializations | map(name) | join(, )",
                    label: "Specialization Trees",
                    type: "textfield",
                },
                combat: {
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
                    type: "number",
                    label: "Soak Value",
                    bind: "character.soak"
                },
                wounds: {
                    type: "container",
                    direction: "horizontal",
                    label: "Wounds",
                    children: [
                        "currentWounds",
                        "thresholdWounds",
                    ]
                },
                thresholdWounds: {
                    type: "number",
                    label: "Threshold",
                    bind: "character.wounds.threshold"
                },
                currentWounds: {
                    type: "number",
                    label: "Current",
                    bind: "character.wounds.current"
                },
                strain: {
                    type: "container",
                    direction: "horizontal",
                    label: "Strain",
                    children: [
                        "thresholdStrain",
                        "currentStrain"
                    ]
                },
                thresholdStrain: {
                    type: "number",
                    label: "Threshold",
                    bind: "character.strain.threshold"
                },
                currentStrain: {
                    type: "number",
                    label: "Current",
                    bind: "character.strain.current"
                },
                defense: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedDefense",
                        "meleeDefense"
                    ]
                },
                rangedDefense: {
                    type: "number",
                    label: "Ranged",
                    bind: "character.defense.ranged"
                },
                meleeDefense: {
                    type: "number",
                    label: "Melee",
                    bind: "character.defense.melee"
                },
                characteristics: {
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
                    type: "number",
                    label: "Brawn",
                    bind: "character.characteristics.brawn"
                },
                agility: {
                    type: "number",
                    label: "Agility",
                    bind: "character.characteristics.agility"
                },
                intellect: {
                    type: "number",
                    label: "Intellect",
                    bind: "character.characteristics.intellect"
                },
                cunning: {
                    type: "number",
                    label: "Cunning",
                    bind: "character.characteristics.cunning"
                },
                willpower: {
                    type: "number",
                    label: "Willpower",
                    bind: "character.characteristics.willpower"
                },
                presence: {
                    type: "number",
                    label: "Presence",
                    bind: "character.characteristics.presence"
                },
                skills: {
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
                    type: "container",
                    direction: "horizontal",
                    children: ["astrogationLabel", "astrogationCareerFlag", "astrogationRating"]
                },
                astrogationLabel: {
                    type: "text",
                    value: "Astrogation"
                },
                astrogationCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.astrogation."
                },
                astrogationRating: {
                    type: "number",
                    bind: "character.skills.astrogation"
                },
                athletics: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "athleticsLabel",
                        "athleticsCareerFlag",
                        "athleticsRating"
                    ]
                },
                athleticsLabel: {
                    type: "text",
                    value: "Athletics"
                },
                athleticsCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.athletics."
                },
                athleticsRating: {
                    type: "number",
                    bind: "character.skills.athletics"
                },
                charm: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "charmLabel",
                        "charmCareerFlag",
                        "charmRating"
                    ]
                },
                charmLabel: {
                    type: "text",
                    value: "Charm"
                },
                charmCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.charm."
                },
                charmRating: {
                    type: "number",
                    bind: "character.skills.charm"
                },
                coercion: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coercionLabel",
                        "coercionCareerFlag",
                        "coercionRating"
                    ]
                },
                coercionLabel: {
                    type: "text",
                    value: "Coercion"
                },
                coercionCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.coercion."
                },
                coercionRating: {
                    type: "number",
                    bind: "character.skills.coercion"
                },
                computers: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "computersLabel",
                        "computersCareerFlag",
                        "computersRating"
                    ]
                },
                computersLabel: {
                    type: "text",
                    value: "Computers"
                },
                computersCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.computers."
                },
                computersRating: {
                    type: "number",
                    bind: "character.skills.computers"
                },
                cool: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coolLabel",
                        "coolCareerFlag",
                        "coolRating"
                    ]
                },
                coolLabel: {
                    type: "text",
                    value: "Cool"
                },
                coolCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.cool."
                },
                coolRating: {
                    type: "number",
                    bind: "character.skills.cool"
                },
                coordination: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coordinationLabel",
                        "coordinationCareerFlag",
                        "coordinationRating"
                    ]
                },
                coordinationLabel: {
                    type: "text",
                    value: "Coordination"
                },
                coordinationCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.coordination."
                },
                coordinationRating: {
                    type: "number",
                    bind: "character.skills.coordination"
                },
                deception: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "deceptionLabel",
                        "deceptionCareerFlag",
                        "deceptionRating"
                    ]
                },
                deceptionLabel: {
                    type: "text",
                    value: "Deception"
                },
                deceptionCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.deception."
                },
                deceptionRating: {
                    type: "number",
                    bind: "character.skills.deception"
                },
                discipline: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "disciplineLabel",
                        "disciplineCareerFlag",
                        "disciplineRating"
                    ]
                },
                disciplineLabel: {
                    type: "text",
                    value: "Discipline"
                },
                disciplineCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.discipline."
                },
                disciplineRating: {
                    type: "number",
                    bind: "character.skills.discipline"
                },
                leadership: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "leadershipLabel",
                        "leadershipCareerFlag",
                        "leadershipRating"
                    ]
                },
                leadershipLabel: {
                    type: "text",
                    value: "Leadership"
                },
                leadershipCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.leadership."
                },
                leadershipRating: {
                    type: "number",
                    bind: "character.skills.leadership"
                },
                mechanics: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "mechanicsLabel",
                        "mechanicsCareerFlag",
                        "mechanicsRating"
                    ]
                },
                mechanicsLabel: {
                    type: "text",
                    value: "Mechanics"
                },
                mechanicsCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.mechanics."
                },
                mechanicsRating: {
                    type: "number",
                    bind: "character.skills.mechanics"
                },
                medicine: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "medicineLabel",
                        "medicineCareerFlag",
                        "medicineRating"
                    ]
                },
                medicineLabel: {
                    type: "text",
                    value: "Medicine"
                },
                medicineCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.medicine."
                },
                medicineRating: {
                    type: "number",
                    bind: "character.skills.medicine"
                },
                negotiation: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "negotiationLabel",
                        "negotiationCareerFlag",
                        "negotiationRating"
                    ]
                },
                negotiationLabel: {
                    type: "text",
                    value: "Negotiation"
                },
                negotiationCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.negotiation."
                },
                negotiationRating: {
                    type: "number",
                    bind: "character.skills.negotiation"
                },
                perception: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "perceptionLabel",
                        "perceptionCareerFlag",
                        "perceptionRating"
                    ]
                },
                perceptionLabel: {
                    type: "text",
                    value: "Perception"
                },
                perceptionCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.perception."
                },
                perceptionRating: {
                    type: "number",
                    bind: "character.skills.perception"
                },
                pilotingPlanetary: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "pilotingPlanetaryLabel",
                        "pilotingPlanetaryCareerFlag",
                        "pilotingPlanetaryRating"
                    ]
                },
                pilotingPlanetaryLabel: {
                    type: "text",
                    value: "PilotingPlanetary"
                },
                pilotingPlanetaryCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.pilotingPlanetary."
                },
                pilotingPlanetaryRating: {
                    type: "number",
                    bind: "character.skills.pilotingPlanetary"
                },
                pilotingSpace: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "pilotingSpaceLabel",
                        "pilotingSpaceCareerFlag",
                        "pilotingSpaceRating"
                    ]
                },
                pilotingSpaceLabel: {
                    type: "text",
                    value: "PilotingSpace"
                },
                pilotingSpaceCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.pilotingSpace."
                },
                pilotingSpaceRating: {
                    type: "number",
                    bind: "character.skills.pilotingSpace"
                },
                resilience: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "resilienceLabel",
                        "resilienceCareerFlag",
                        "resilienceRating"
                    ]
                },
                resilienceLabel: {
                    type: "text",
                    value: "Resilience"
                },
                resilienceCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.resilience."
                },
                resilienceRating: {
                    type: "number",
                    bind: "character.skills.resilience"
                },
                skulduggery: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "skulduggeryLabel",
                        "skulduggeryCareerFlag",
                        "skulduggeryRating"
                    ]
                },
                skulduggeryLabel: {
                    type: "text",
                    value: "Skulduggery"
                },
                skulduggeryCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.skulduggery."
                },
                skulduggeryRating: {
                    type: "number",
                    bind: "character.skills.skulduggery"
                },
                stealth: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "stealthLabel",
                        "stealthCareerFlag",
                        "stealthRating"
                    ]
                },
                stealthLabel: {
                    type: "text",
                    value: "Stealth"
                },
                stealthCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.stealth."
                },
                stealthRating: {
                    type: "number",
                    bind: "character.skills.stealth"
                },
                streetwise: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "streetwiseLabel",
                        "streetwiseCareerFlag",
                        "streetwiseRating"
                    ]
                },
                streetwiseLabel: {
                    type: "text",
                    value: "Streetwise"
                },
                streetwiseCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.streetwise."
                },
                streetwiseRating: {
                    type: "number",
                    bind: "character.skills.streetwise"
                },
                survival: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "survivalLabel",
                        "survivalCareerFlag",
                        "survivalRating"
                    ]
                },
                survivalLabel: {
                    type: "text",
                    value: "Survival"
                },
                survivalCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.survival."
                },
                survivalRating: {
                    type: "number",
                    bind: "character.skills.survival"
                },
                vigilance: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "vigilanceLabel",
                        "vigilanceCareerFlag",
                        "vigilanceRating"
                    ]
                },
                vigilanceLabel: {
                    type: "text",
                    value: "Vigilance"
                },
                vigilanceCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.vigilance."
                },
                vigilanceRating: {
                    type: "number",
                    bind: "character.skills.vigilance"
                },
                combatSkills: {
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
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "brawlLabel",
                        "brawlCareerFlag",
                        "brawlRating"
                    ]
                },
                brawlLabel: {
                    type: "text",
                    value: "Brawl"
                },
                brawlCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.brawl."
                },
                brawlRating: {
                    type: "number",
                    bind: "character.skills.brawl"
                },
                gunnery: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "gunneryLabel",
                        "gunneryCareerFlag",
                        "gunneryRating"
                    ]
                },
                gunneryLabel: {
                    type: "text",
                    value: "Gunnery"
                },
                gunneryCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.gunnery."
                },
                gunneryRating: {
                    type: "number",
                    bind: "character.skills.gunnery"
                },
                melee: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "meleeLabel",
                        "meleeCareerFlag",
                        "meleeRating"
                    ]
                },
                meleeLabel: {
                    type: "text",
                    value: "Melee"
                },
                meleeCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.melee."
                },
                meleeRating: {
                    type: "number",
                    bind: "character.skills.melee"
                },
                rangedLight: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedLightLabel",
                        "rangedLightCareerFlag",
                        "rangedLightRating"
                    ]
                },
                rangedLightLabel: {
                    type: "text",
                    value: "Ranged - Light"
                },
                rangedLightCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.rangedLight."
                },
                rangedLightRating: {
                    type: "number",
                    bind: "character.skills.rangedLight"
                },
                rangedHeavy: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "rangedHeavyLabel",
                        "rangedHeavyCareerFlag",
                        "rangedHeavyRating"
                    ]
                },
                rangedHeavyLabel: {
                    type: "text",
                    value: "Ranged - Heavy"
                },
                rangedHeavyCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.rangedHeavy."
                },
                rangedHeavyRating: {
                    type: "number",
                    bind: "character.skills.rangedHeavy"
                },
                knowledgeSkills: {
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
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "coreWorldsLabel",
                        "coreWorldsCareerFlag",
                        "coreWorldsRating"
                    ]
                },
                coreWorldsLabel: {
                    type: "text",
                    value: "CoreWorlds"
                },
                coreWorldsCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.coreWorlds."
                },
                coreWorldsRating: {
                    type: "number",
                    bind: "character.skills.coreWorlds"
                },
                education: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "educationLabel",
                        "educationCareerFlag",
                        "educationRating"
                    ]
                },
                educationLabel: {
                    type: "text",
                    value: "Education"
                },
                educationCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.education."
                },
                educationRating: {
                    type: "number",
                    bind: "character.skills.education"
                },
                lore: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "loreLabel",
                        "loreCareerFlag",
                        "loreRating"
                    ]
                },
                loreLabel: {
                    type: "text",
                    value: "Lore"
                },
                loreCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.lore."
                },
                loreRating: {
                    type: "number",
                    bind: "character.skills.lore"
                },
                outerRim: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "outerRimLabel",
                        "outerRimCareerFlag",
                        "outerRimRating"
                    ]
                },
                outerRimLabel: {
                    type: "text",
                    value: "OuterRim"
                },
                outerRimCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.outerRim."
                },
                outerRimRating: {
                    type: "number",
                    bind: "character.skills.outerRim"
                },
                underworld: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "underworldLabel",
                        "underworldCareerFlag",
                        "underworldRating"
                    ]
                },
                underworldLabel: {
                    type: "text",
                    value: "Underworld"
                },
                underworldCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.underworld."
                },
                underworldRating: {
                    type: "number",
                    bind: "character.skills.underworld"
                },
                xenology: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "xenologyLabel",
                        "xenologyCareerFlag",
                        "xenologyRating"
                    ]
                },
                xenologyLabel: {
                    type: "text",
                    value: "Xenology"
                },
                xenologyCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.xenology."
                },
                xenologyRating: {
                    type: "number",
                    bind: "character.skills.xenology"
                },

                other: {
                    type: "container",
                    direction: "horizontal",
                    children: ["otherLabel", "otherCareerFlag", "otherRating"]
                },
                otherLabel: {
                    type: "text",
                    value: "Other"
                },
                otherCareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.other."
                },
                otherRating: {
                    type: "number",
                    bind: "character.skills.other"
                },

                customSkills: {
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
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom1Label",
                        "custom1CareerFlag",
                        "custom1Rating"
                    ]
                },
                custom1Label: {
                    type: "text",
                    value: "Custom1"
                },
                custom1CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom1."
                },
                custom1Rating: {
                    type: "number",
                    bind: "character.skills.custom1"
                },
                custom2: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom2Label",
                        "custom2CareerFlag",
                        "custom2Rating"
                    ]
                },
                custom2Label: {
                    type: "text",
                    value: "Custom2"
                },
                custom2CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom2."
                },
                custom2Rating: {
                    type: "number",
                    bind: "character.skills.custom2"
                },
                custom3: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom3Label",
                        "custom3CareerFlag",
                        "custom3Rating"
                    ]
                },
                custom3Label: {
                    type: "text",
                    value: "Custom3"
                },
                custom3CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom3."
                },
                custom3Rating: {
                    type: "number",
                    bind: "character.skills.custom3"
                },
                custom4: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom4Label",
                        "custom4CareerFlag",
                        "custom4Rating"
                    ]
                },
                custom4Label: {
                    type: "text",
                    value: "Custom4"
                },
                custom4CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom4."
                },
                custom4Rating: {
                    type: "number",
                    bind: "character.skills.custom4"
                },
                custom5: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom5Label",
                        "custom5CareerFlag",
                        "custom5Rating"
                    ]
                },
                custom5Label: {
                    type: "text",
                    value: "Custom5"
                },
                custom5CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom5."
                },
                custom5Rating: {
                    type: "number",
                    bind: "character.skills.custom5"
                },
                custom6: {
                    type: "container",
                    direction: "horizontal",
                    children: [
                        "custom6Label",
                        "custom6CareerFlag",
                        "custom6Rating"
                    ]
                },
                custom6Label: {
                    type: "text",
                    value: "Custom6"
                },
                custom6CareerFlag: {
                    type: "checkbox",
                    bind: "character.skills.custom6."
                },
                custom6Rating: {
                    type: "number",
                    bind: "character.skills.custom6"
                },
            }
        });
    });
});