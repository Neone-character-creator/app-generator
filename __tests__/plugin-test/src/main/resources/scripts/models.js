const _ = require("lodash");


module.exports = {
        obligation:obligationModel,
	armor:armorModel,
	weapon:weaponModel,
	talent:talentModel,
	specialization:specializationModel,
	career:careerModel,
	specialAbility:specialAbilityModel,
	characteristics:characteristicsModel,
	defense:defenseModel,
	species:speciesModel,
	strainThreshold:strainThresholdModel,
	woundsThreshold:woundsThresholdModel,
	woundsOrStrain:woundsOrStrainModel,
	skill:skillModel,
	skills:skillsModel,
	character:characterModel
    }

function obligationModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'obligation-' + obligationModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "obligation";
}

obligationModel._id = 1;
obligationModel.id = function(){
    return obligationModel._id++;
}

function armorModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'armor-' + armorModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "armor";
}

armorModel._id = 1;
armorModel.id = function(){
    return armorModel._id++;
}

function weaponModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'weapon-' + weaponModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "weapon";
}

weaponModel._id = 1;
weaponModel.id = function(){
    return weaponModel._id++;
}

function talentModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'talent-' + talentModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "talent";
}

talentModel._id = 1;
talentModel.id = function(){
    return talentModel._id++;
}

function specializationModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'specialization-' + specializationModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "specialization";
}

specializationModel._id = 1;
specializationModel.id = function(){
    return specializationModel._id++;
}

function careerModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'career-' + careerModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "career";
}

careerModel._id = 1;
careerModel.id = function(){
    return careerModel._id++;
}

function specialAbilityModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'specialAbility-' + specialAbilityModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "specialAbility";
}

specialAbilityModel._id = 1;
specialAbilityModel.id = function(){
    return specialAbilityModel._id++;
}

function characteristicsModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'characteristics-' + characteristicsModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "characteristics";
}

characteristicsModel._id = 1;
characteristicsModel.id = function(){
    return characteristicsModel._id++;
}

function defenseModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'defense-' + defenseModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "defense";
}

defenseModel._id = 1;
defenseModel.id = function(){
    return defenseModel._id++;
}

function speciesModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'species-' + speciesModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "species";
}

speciesModel._id = 1;
speciesModel.id = function(){
    return speciesModel._id++;
}

function strainThresholdModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'strainThreshold-' + strainThresholdModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "strainThreshold";
}

strainThresholdModel._id = 1;
strainThresholdModel.id = function(){
    return strainThresholdModel._id++;
}

function woundsThresholdModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'woundsThreshold-' + woundsThresholdModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "woundsThreshold";
}

woundsThresholdModel._id = 1;
woundsThresholdModel.id = function(){
    return woundsThresholdModel._id++;
}

function woundsOrStrainModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'woundsOrStrain-' + woundsOrStrainModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "woundsOrStrain";
}

woundsOrStrainModel._id = 1;
woundsOrStrainModel.id = function(){
    return woundsOrStrainModel._id++;
}

function skillModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'skill-' + skillModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "skill";
}

skillModel._id = 1;
skillModel.id = function(){
    return skillModel._id++;
}

function skillsModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'skills-' + skillsModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "skills";
}

skillsModel._id = 1;
skillsModel.id = function(){
    return skillsModel._id++;
}

function characterModel(original){
    Object.getOwnPropertyNames(this.definition).forEach((property)=>{
        const propertyDef = this.definition[property];
        if(original === undefined || original[property] === undefined) {
            if(propertyDef.default !== undefined) {
                this[property] = propertyDef.default;
            } else if (propertyDef.type.match(/\[.*\]/)){
                this[property] = [];
                const instanceTypeName = propertyDef.type.substring(1, propertyDef.type.length - 1);
                const instanceDefinition = module.exports[instanceTypeName];
                if (instanceDefinition) {
                    this[property].__proto__.definition = instanceDefinition.definition;
                    this[property].__proto__.values = instanceDefinition.values;
                }
            } else {
                this[property] = new module.exports[propertyDef.type]();
            }
        } else {
            if(_.isString(original[property]) && original[property].startsWith("#")) {
                this[property] = original[property];
            } else if (_.isArray(original[property])){
                const containedType = propertyDef.type.substring(1, propertyDef.type.length -1);
                const constructor = module.exports[containedType];
                if(constructor) {
                    this[property] = original[property].map(i => {
                        const lookupValue = constructor.values[i];
                        if (lookupValue){
                            return lookupValue;
                        } else {
                            return new constructor(i)
                        }
                    });
                } else {
                    this[property] = original[property];
                }
            } else if (_.isObject(original[property])) {
                if(original[property].choices && original[property].options) {
                    this[property] = original[property];
                } else {
                    this[property] = {...this[property], ...new module.exports[propertyDef.type](original[property])};
                }
            } else {
                this[property] = original[property];
            }
         }
    });
    if(this.id === undefined) {
        this.id = 'character-' + characterModel.id();
    }
    this.effects = _.isArray(this.__proto__.effects) ? [...this.__proto__.effects] : {...this.__proto__.effects};
    this._protoName = "character";
}

characterModel._id = 1;
characterModel.id = function(){
    return characterModel._id++;
}


obligationModel.prototype.definition = JSON.parse(`{"rating":{"type":"number","default":0},"description":{"type":"string","default":""},"type":{"type":"string","default":""}}`);
obligationModel.prototype.effects = JSON.parse(`[]`);


armorModel.prototype.definition = JSON.parse(`{"rarity":{"type":"number","default":0},"isRestricted":{"type":"boolean","default":false},"hardpoints":{"type":"number","default":0},"encumbrance":{"type":"number","default":0},"price":{"type":"number","default":0},"soak":{"type":"number","default":0},"defense":{"type":"number","default":0},"name":{"type":"string","default":""}}`);
armorModel.prototype.effects = JSON.parse(`[]`);


weaponModel.prototype.definition = JSON.parse(`{"special":{"type":"[string]"},"rarity":{"type":"number","default":0},"isRestricted":{"type":"boolean","default":false},"price":{"type":"number","default":0},"hardpoints":{"type":"number","default":0},"encumbrance":{"type":"number","default":0},"range":{"type":"string","default":""},"criticalRating":{"type":"number","default":0},"damage":{"type":"number","default":0},"skill":{"type":"string","default":""},"name":{"type":"string","default":""}}`);
weaponModel.prototype.effects = JSON.parse(`[]`);


talentModel.prototype.definition = JSON.parse(`{"name":{"type":"string","default":""},"id":{"type":"string","default":""}}`);
talentModel.prototype.effects = JSON.parse(`[]`);


specializationModel.prototype.definition = JSON.parse(`{"talents":{"type":"[talent]"},"careerSkills":{"type":"[skill]"},"name":{"type":"string","default":""}}`);
specializationModel.prototype.effects = JSON.parse(`[]`);


careerModel.prototype.definition = JSON.parse(`{"specializations":{"type":"[specialization]"},"careerSkills":{"type":"[string]"},"name":{"type":"string","default":""}}`);
careerModel.prototype.effects = JSON.parse(`[]`);


specialAbilityModel.prototype.definition = JSON.parse(`{"description":{"type":"string","default":""},"name":{"type":"string","default":""}}`);
specialAbilityModel.prototype.effects = JSON.parse(`[]`);


characteristicsModel.prototype.definition = JSON.parse(`{"presence":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.presence"]},"willpower":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.willpower"]},"cunning":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.cunning"]},"intellect":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.intellect"]},"agility":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.agility"]},"brawn":{"type":"number","default":0,"derivedFrom":["# $state.character.species.baseCharacteristics.brawn"]}}`);
characteristicsModel.prototype.effects = JSON.parse(`[]`);


defenseModel.prototype.definition = JSON.parse(`{"melee":{"type":"number","default":0,"derivedFrom":["# $state.character.armor.map(a => a.defense).reduce((a,b)=>a+b, 0)"]},"ranged":{"type":"number","default":0,"derivedFrom":["# $state.character.armor.map(a => a.defense).reduce((a,b)=>a+b, 0)"]}}`);
defenseModel.prototype.effects = JSON.parse(`[]`);


speciesModel.prototype.definition = JSON.parse(`{"specialAbilities":{"type":"[specialAbility]"},"firstSpecialtyTrainedSkills":{"type":"number","default":3},"startingCareerSkillChoices":{"type":"number","default":4},"careerSkills":{"type":"[skill]"},"startingTalents":{"type":"[talent]"},"startingSkills":{"type":"[string]"},"startingExperience":{"type":"number","default":0},"strainThreshold":{"type":"strainThreshold"},"woundsThreshold":{"type":"woundsThreshold"},"baseCharacteristics":{"type":"characteristics"},"source":{"type":"string","default":""},"plural":{"type":"string","default":""},"name":{"type":"string","default":""}}`);
speciesModel.prototype.effects = JSON.parse(`[]`);


strainThresholdModel.prototype.definition = JSON.parse(`{"characteristic":{"type":"string","default":"willpower"},"base":{"type":"number","default":0}}`);
strainThresholdModel.prototype.effects = JSON.parse(`[]`);


woundsThresholdModel.prototype.definition = JSON.parse(`{"characteristic":{"type":"string","default":"brawn"},"base":{"type":"number","default":0}}`);
woundsThresholdModel.prototype.effects = JSON.parse(`[]`);


woundsOrStrainModel.prototype.definition = JSON.parse(`{"threshold":{"type":"number","default":0},"current":{"type":"number","default":0}}`);
woundsOrStrainModel.prototype.effects = JSON.parse(`[]`);


skillModel.prototype.definition = JSON.parse(`{"rank":{"type":"number","default":0,"derivedFrom":["# $state.character.careerStartingSkills.map(s => s.toLowerCase()).includes($this.path[2]) ? 1 : 0"]},"characteristic":{"type":"string","default":""},"isCareerSkill":{"type":"boolean","default":false,"derivedFrom":["# $state.character.speciesCareerSkills.map(s => s.toLowerCase()).includes($this.path[2])","# $this.accumulator || ($state.character.career.specializations.map(s => s.careerSkills).includes($this.ancestors[0].name))","# $this.accumulator || ($state.character.species && $state.character.species.careerSkills.includes($this.ancestors[0].name))"]},"name":{"type":"string","default":""}}`);
skillModel.prototype.effects = JSON.parse(`[]`);


skillsModel.prototype.definition = JSON.parse(`{"astrogation":{"type":"skill","value":{"name":"Astrogation","characteristic":"Intellect"}},"athletics":{"type":"skill","value":{"name":"Athletics","characteristic":"Brawn"}},"charm":{"type":"skill","value":{"name":"Charm","characteristics":"Presence"}},"coercion":{"type":"skill","value":{"name":"Coercion","characteristics":"Willpower"}},"computers":{"type":"skill","value":{"name":"Computers","characteristics":"Intellect"}},"cool":{"type":"skill","value":{"name":"Cool","characteristic":"Presence"}},"coordination":{"type":"skill","value":{"name":"Coordination","characteristic":"Agility"}},"deception":{"type":"skill","value":{"name":"Deception","characteristic":"Cunning"}},"discipline":{"type":"skill","value":{"name":"Discipline","characteristic":"Willpower"}},"leadership":{"type":"skill","value":{"name":"Leadership","characteristic":"Presence"}},"mechanics":{"type":"skill","value":{"name":"Mechanics","characteristic":"Intellect"}},"medicine":{"type":"skill","value":{"name":"Medicine","characteristic":"Intellect"}},"negotiation":{"type":"skill","value":{"name":"Negotiation","characteristic":"Presence"}},"perception":{"type":"skill","value":{"name":"Perception","characteristic":"Cunning"}},"pilotingPlanetary":{"type":"skill","value":{"name":"Piloting - Planetary ","characteristic":"Agility"}},"pilotingSpace":{"type":"skill","value":{"name":"Piloting - Space","characteristic":"Agility"}},"resilience":{"type":"skill","value":{"name":"Resilience","characteristic":"Brawn"}},"skulduggery":{"type":"skill","value":{"name":"Skulduggery","characteristic":"Cunning"}},"stealth":{"type":"skill","value":{"name":"Stealth","characteristic":"Agility"}},"streetwise":{"type":"skill","value":{"name":"Streetwise","characteristic":"Cunning"}},"survival":{"type":"skill","value":{"name":"Survival","characteristic":"Cunning"}},"vigilance":{"type":"skill","value":{"name":"Vigilance","characteristic":"Willpower"}},"brawl":{"type":"skill","value":{"name":"Brawl","characteristic":"Brawn"}},"gunnery":{"type":"skill","value":{"name":"Gunnery","characteristic":"Agility"}},"melee":{"type":"skill","value":{"name":"Melee","characteristic":"Brawn"}},"rangedLight":{"type":"skill","value":{"name":"Ranged - Light","characteristic":"Agility"}},"rangedHeavy":{"type":"skill","value":{"name":"Ranged - Heavy","characteristic":"Agility"}},"knowledgeCoreWorlds":{"type":"skill","value":{"name":"Knowledge - Core Worlds","characteristic":"Intellect"}},"knowledgeEducation":{"type":"skill","value":{"name":"Knowledge - Education","characteristic":"Intellect"}},"knowledgeLore":{"type":"skill","value":{"name":"Knowledge - Lore","characteristic":"Intellect"}},"knowledgeOuterRim":{"type":"skill","value":{"name":"Knowledge - Outer Rim","characteristic":"Intellect"}},"knowledgeUnderworld":{"type":"skill","value":{"name":"Knowledge - Underworld","characteristic":"Intellect"}},"knowledgeXenology":{"type":"skill","value":{"name":"Knowledge - Xenology","characteristic":"Intellect"}},"knowledgeOther":{"type":"skill","value":{"name":"Knowledge - Other","characteristic":"Intellect"}}}`);
skillsModel.prototype.effects = JSON.parse(`[]`);


characterModel.prototype.definition = JSON.parse(`{"obligations":{"type":"[obligation]"},"motivations":{"type":"[string]","default":[""]},"otherItems":{"type":"[string]"},"credits":{"type":"number","default":0},"armor":{"type":"[armor]"},"weapons":{"type":"[weapon]"},"advancements":{"type":"[advancement]"},"skills":{"type":"skills"},"characteristics":{"type":"characteristics"},"strain":{"type":"number","default":0,"derivedFrom":["# _.get($state.character.characteristics, _.get($state, 'character.species.strainThreshold.characteristics'), 0) + _.get($state, 'character.species.strainThreshold.base', 0)"]},"wounds":{"type":"number","default":0,"derivedFrom":["# _.get($state.character.characteristics, _.get($state, 'character.species.woundsThreshold.characteristics'), 0) + _.get($state, 'character.species.woundsThreshold.base', 0)"]},"totalExperience":{"type":"number","default":0,"baseValue":["# $state.character.species.startingExperience"]},"availableExperience":{"type":"number","default":0,"derivedFrom":["# $state.character.advancements.map(a => a.cost).reduce((x, y)=> x-y, $state.character.totalExperience)"]},"soak":{"type":"number","default":0,"derivedFrom":["# $state.character.characteristics.brawn;","# $state.character.armor.map(a => a.soak).reduce((a, b) => a+b, $this.accumulator);"]},"forceRating":{"type":"number","default":0,"derivedFrom":["# $state.character.advancements.filter(a => a.type === 'talent').map(a => a.option.value === 'force-rating').length","# _.get($state, 'character.species.name') === 'Droid' ? 0 : $this.accumulator"]},"talents":{"type":"[talent]"},"speciesCareerSkills":{"type":"[string]"},"careerStartingSkills":{"type":"[string]"},"specializations":{"type":"[specialization]"},"career":{"type":"career"},"defense":{"type":"defense"},"species":{"type":"species"},"name":{"type":"string","default":""}}`);
characterModel.prototype.effects = JSON.parse(`[]`);



obligationModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new obligationModel(parsed);
    instantiated.__proto__ = obligationModel.prototype;
    return instantiated;
});
obligationModel.values = (obligationModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in obligationModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (obligationModel._values || []));

armorModel._values = JSON.parse(`[{"name":"Adverse Environment Gear","defense":0,"soak":1,"price":500,"encumbrance":2,"hardpoints":1,"rarity":1},{"name":"Armored Clothing","defense":1,"soak":1,"price":1000,"encumbrance":3,"hardpoints":1,"rarity":6},{"name":"Heavy Battle Armor","defense":1,"soak":2,"price":5000,"encumbrance":6,"hardpoints":4,"rarity":7},{"name":"Heavy Clothing","defense":0,"soak":1,"price":50,"encumbrance":1,"hardpoints":0,"rarity":0},{"name":"Laminate","defense":0,"soak":2,"price":2500,"encumbrance":4,"hardpoints":3,"rarity":5},{"name":"Personal Deflector Shield","defense":2,"soak":0,"price":2500,"encumbrance":3,"hardpoints":0,"rarity":8},{"name":"Padded Armor","defense":0,"soak":2,"price":500,"encumbrance":2,"hardpoints":0,"rarity":1}]`).map(parsed => {
    const instantiated = new armorModel(parsed);
    instantiated.__proto__ = armorModel.prototype;
    return instantiated;
});
armorModel.values = (armorModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in armorModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (armorModel._values || []));

weaponModel._values = JSON.parse(`[{"name":"Holdout Blaster","skill":"ranged (Light)","damage":5,"criticalRating":4,"range":"Short","encumbrance":1,"hardpoints":1,"price":200,"rarity":4,"special":["Stun setting"]},{"name":"Light Blaster Pistol","skill":"ranged (Light)","damage":5,"criticalRating":4,"range":"Medium","encumbrance":1,"hardpoints":2,"price":300,"rarity":4,"special":["Stun setting"]},{"name":"Blaster Pistol","skill":"ranged (Light)","damage":6,"criticalRating":3,"range":"Medium","encumbrance":1,"hardpoints":3,"price":400,"rarity":4,"special":["Stun setting"]},{"name":"Heavy Blaster Pistol","skill":"ranged (Light)","damage":7,"criticalRating":3,"range":"Medium","encumbrance":2,"hardpoints":3,"price":700,"rarity":6,"special":["Stun setting"]},{"name":"Blaster Carbine","skill":"ranged (Heavy)","damage":9,"criticalRating":3,"range":"Medium","encumbrance":3,"hardpoints":4,"price":850,"rarity":5,"special":["Stun setting"]},{"name":"Blaster Rifle","skill":"ranged (Heavy)","damage":9,"criticalRating":3,"range":"Long","encumbrance":4,"hardpoints":4,"price":900,"rarity":5,"special":["Stun setting"]},{"name":"Heavy Blaster Rifle","skill":"ranged (Heavy)","damage":10,"criticalRating":3,"range":"Long","encumbrance":6,"hardpoints":4,"price":1500,"rarity":6,"special":["Auto-fire","Cumbersome 3"]},{"name":"Light Repeating Blaster","skill":"ranged (Heavy)","damage":11,"criticalRating":3,"range":"Long","encumbrance":7,"hardpoints":4,"price":2250,"isRestricted":true,"rarity":7,"special":["Auto-fire","Cumbersome 4","Pierce 1"]},{"name":"Heavy Repeating Rifle","skill":"Gunnery","damage":15,"criticalRating":2,"range":"Long","encumbrance":9,"hardpoints":4,"price":6000,"isRestricted":true,"rarity":8,"special":["Auto-fire","Cumbersome 5","Pierce 2","Vicious 1"]},{"name":"Bowcaster","skill":"ranged (Heavy)","damage":10,"criticalRating":3,"range":"Medium","encumbrance":5,"hardpoints":2,"price":1250,"rarity":7,"special":["Cumbersome 3","knockdown"]},{"name":"Ionization Blaster","skill":"ranged (Light)","damage":10,"criticalRating":5,"range":"Short","encumbrance":3,"hardpoints":3,"price":250,"rarity":3,"special":["disorient 5","Stun Damage (Droid Only)"]},{"name":"Disruptor Pistol","skill":"ranged (Light)","damage":10,"criticalRating":2,"range":"Short","encumbrance":2,"hardpoints":2,"price":3000,"isRestricted":true,"rarity":6,"special":["Vicious 6"]},{"name":"Disruptor Rifle","skill":"ranged (Heavy)","damage":10,"criticalRating":2,"range":"Long","encumbrance":5,"hardpoints":4,"price":5000,"isRestricted":true,"rarity":6,"special":["Vicious 5","Cumbersome"]},{"name":"Slugthrower Pistol","skill":"ranged (Light)","damage":4,"criticalRating":5,"range":"Short","encumbrance":1,"hardpoints":0,"price":100,"rarity":3},{"name":"Slugthrower Rifle","skill":"ranged (Heavy)","damage":7,"criticalRating":5,"range":"Medium","encumbrance":5,"hardpoints":1,"price":250,"rarity":3,"special":["Cumbersome 2"]},{"name":"Bola / Net","skill":"ranged (Light)","damage":2,"criticalRating":0,"range":"Short","encumbrance":0.3,"hardpoints":2,"price":20,"rarity":2,"special":["Ensnare 3","knockdown","Limited Ammo 1"]},{"name":"Flame Projector","skill":"ranged (Heavy)","damage":8,"criticalRating":2,"range":"Short","encumbrance":6,"hardpoints":2,"price":1000,"rarity":6,"special":["Burn 3","Blast 8"]},{"name":"Missile Tube","skill":"Gunnery","damage":20,"criticalRating":2,"range":"Extreme","encumbrance":7,"hardpoints":4,"price":7500,"isRestricted":true,"rarity":8,"special":["Blast 10","Cumbersome 3","Guided 3","Breach 1","Prepare 1","Limited Ammo 6"]},{"name":"Frag Grenade","skill":"ranged (Light)","damage":8,"criticalRating":4,"range":"Short","encumbrance":1,"hardpoints":0,"price":50,"rarity":5,"special":["Blast 6","Limited Ammo 1"]},{"name":"Stun Grenade","skill":"ranged (Light)","damage":8,"criticalRating":0,"range":"Short","encumbrance":1,"hardpoints":0,"price":1500,"rarity":6,"special":["disorient 3","Stun Damage","Blast 8","Limited Ammo 1"]},{"name":"Thermal Detonator","skill":"ranged (Light)","damage":20,"criticalRating":2,"range":"Short","encumbrance":1,"hardpoints":0,"price":2000,"isRestricted":true,"rarity":6,"special":["Blast 15","Breach 1","Vicious 4","Limited Ammo 1"]},{"name":"Brass Knuckles","skill":"Brawl","damage":1,"criticalRating":4,"range":"Engaged","encumbrance":1,"hardpoints":0,"price":25,"rarity":0,"special":["disorient 3"]},{"name":"Shock Gloves","skill":"Brawl","damage":0,"criticalRating":5,"range":"Engaged","encumbrance":0,"hardpoints":1,"price":300,"rarity":2,"special":["Stun 3"]},{"name":"Combat Knife","skill":"Melee","damage":1,"criticalRating":3,"range":"Engaged","encumbrance":1,"hardpoints":0,"price":25,"rarity":1,"special":[]},{"name":"Gaffi Stick","skill":"Melee","damage":2,"criticalRating":3,"range":"Engaged","encumbrance":3,"hardpoints":0,"price":100,"rarity":2,"special":["Defensive 1","disorient 3"]},{"name":"Force Pike","skill":"Melee","damage":3,"criticalRating":2,"range":"Engaged","encumbrance":3,"hardpoints":3,"price":500,"rarity":4,"special":["Pierce 2","Stun Setting"]},{"name":"Lightsaber","skill":"Lightsaber","damage":10,"criticalRating":1,"range":"Engaged","encumbrance":1,"hardpoints":0,"price":10000,"isRestricted":true,"rarity":10,"special":["Breach 1","Sunder","Vicious 2"]},{"name":"Truncheon","skill":"Melee","damage":2,"criticalRating":5,"range":"Engaged","encumbrance":2,"hardpoints":0,"price":15,"rarity":1,"special":["disorient 2"]},{"name":"Vibro-Ax","skill":"Melee","damage":3,"criticalRating":2,"range":"Engaged","encumbrance":4,"hardpoints":3,"price":750,"rarity":5,"special":["Pierce 2","Sunder","Vicious 3"]},{"name":"Vibroknife","skill":"Melee","damage":1,"criticalRating":2,"range":"Engaged","encumbrance":1,"hardpoints":2,"price":250,"rarity":3,"special":["Pierce 2","Vicious 1"]},{"name":"Vibrosword","skill":"Melee","damage":2,"criticalRating":2,"range":"Engaged","encumbrance":3,"hardpoints":3,"price":750,"rarity":5,"special":["Pierce 2","Vicious 1","Defensive 1"]}]`).map(parsed => {
    const instantiated = new weaponModel(parsed);
    instantiated.__proto__ = weaponModel.prototype;
    return instantiated;
});
weaponModel.values = (weaponModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in weaponModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (weaponModel._values || []));

talentModel._values = JSON.parse(`[{"id":"anatomy-lessons","name":"Anatomy Lessons"},{"id":"armor-master","name":"Armor Master"},{"id":"armor-master-improved","name":"Armor Master Improved"},{"id":"bacta-specialist","name":"Bacta Specialist"},{"id":"bad-motivator","name":"Bad Motivator"},{"id":"balance","name":"Balance"},{"id":"barrage","name":"Barrage"},{"id":"black-market-contacts","name":"Black Market Contacts"},{"id":"blooded","name":"Blooded"},{"id":"body-guard","name":"Body Guard"},{"id":"brace","name":"Brace"},{"id":"brilliant-evasion","name":"Brilliant Evasion"},{"id":"bypass-security","name":"Bypass Security"},{"id":"codebreaker","name":"Codebreaker"},{"id":"command","name":"Command"},{"id":"confidence","name":"Confidence"},{"id":"contraption","name":"Contraption"},{"id":"convincing-demeanor","name":"Convincing Demeanor"},{"id":"crippling-blow","name":"Crippling Blow"},{"id":"deadly-accuracy","name":"Deadly Accuracy"},{"id":"dead-to-rights","name":"Dead To Rights"},{"id":"dead-to-rights-improved","name":"Dead To Rights Improved"},{"id":"dedication","name":"Dedication"},{"id":"defensive-driving","name":"Defensive Driving"},{"id":"defensive-slicing","name":"Defensive Slicing"},{"id":"defensive-slicing-improved","name":"Sefensive Slicing Improved"},{"id":"defensive-stance","name":"Defensive Stance"},{"id":"disorient","name":"Disorient"},{"id":"dodge","name":"Dodge"},{"id":"durable","name":"Durable"},{"id":"enduring","name":"Enduring"},{"id":"expert-tracker","name":"Expert Tracker"},{"id":"familiar-suns","name":"Familiar Suns"},{"id":"feral-strength","name":"Feral Strength"},{"id":"field-commander","name":"Field Commander"},{"id":"fine-tuning","name":"Fine Tuning"},{"id":"field-commander-improved","name":"Field Commander Improved"},{"id":"frenzied-attack","name":"Frenzied Attack"},{"id":"forager","name":"Forager"},{"id":"forceRating","name":"Force Rating"},{"id":"force-influence-basic-power","name":"Influence - Basic Power"},{"id":"force-influence-control-charisma","name":"Influence - Control Charisma"},{"id":"force-influence-control-emotion","name":"Influence - Control Emotion"},{"id":"force-influence-duration","name":"Influence - Duration"},{"id":"force-influence-magnitude","name":"Influence - Magnitude"},{"id":"force-influence-strength","name":"Influence - Strength"},{"id":"force-influence-range","name":"Influence - Range"},{"id":"force-move-basic-power","name":"Move - Basic Power"},{"id":"force-move-control-fine","name":"Move - Control Fine Control"},{"id":"force-move-control-pull","name":"Move - Control Pull"},{"id":"force-move-control-throw","name":"Move - Control Throw"},{"id":"force-move-magnitude","name":"Move - Magnitude"},{"id":"force-move-range","name":"Move - Range"},{"id":"force-move-strength","name":"Move - Strength"},{"id":"force-sense-basic-power","name":"Sense - Basic Power"},{"id":"force-sense-control-accuracy","name":"Sense Control - Accuracy"},{"id":"force-sense-duration","name":"Sense - Duration"},{"id":"force-sense-control-evasion","name":"Sense Control - Evade"},{"id":"force-sense-magnitude","name":"Sense Control - Magnitude"},{"id":"force-sense-control-telepathy","name":"Sense Control - Telepathy"},{"id":"force-sense-range","name":"Sense - Range"},{"id":"force-sense-danger","name":"Sense Danger"},{"id":"force-sense-emotions","name":"Sense Emotions"},{"id":"full-throttle","name":"full-throttle"},{"id":"full-throttle-improved","name":"full-throttle-improved"},{"id":"full-throttle-supreme","name":"full-throttle-supreme"},{"id":"galaxy-mapper","name":"galaxy-mapper"},{"id":"gearhead","name":"gearhead"},{"id":"grit","name":"grit"},{"id":"hard-headed","name":"hard-headed"},{"id":"hard-headed-improved","name":"hard-headed-improved"},{"id":"heightened-awareness","name":"heightened-awareness"},{"id":"heroic-fortitude","name":"heroic-fortitude"},{"id":"hidden-storage","name":"hidden-storage"},{"id":"hold-together","name":"hold-together"},{"id":"hunter","name":"hunter"},{"id":"indistinguishable","name":"indistinguishable"},{"id":"insight","name":"insight"},{"id":"inspiring-rhetoric","name":"inspiring-rhetoric"},{"id":"inspiring-rhetoric-improved","name":"inspiring-rhetoric-improved"},{"id":"inspiring-rhetoric-supreme","name":"inspiring-rhetoric-supreme"},{"id":"intense-focus","name":"intense-focus"},{"id":"intense-presence","name":"intense-presence"},{"id":"intimidating","name":"intimidating"},{"id":"jump-up","name":"jump-up"},{"id":"jury-rigged","name":"jury-rigged"},{"id":"kill-with-kindness","name":"kill-with-kindness"},{"id":"knockdown","name":"knockdown"},{"id":"knowledge-specialization","name":"knowledge-specialization"},{"id":"known-schematic","name":"known-schematic"},{"id":"know-somebody","name":"know-somebody"},{"id":"lethal-blows","name":"lethal-blows"},{"id":"lets-ride","name":"lets-ride"},{"id":"magnitude","name":"magnitude"},{"id":"master-doctor","name":"master-doctor"},{"id":"master-merchant","name":"master-merchant"},{"id":"master-of-shadows","name":"master-of-shadows"},{"id":"master-pilot","name":"master-pilot"},{"id":"master-slicer","name":"master-slicer"},{"id":"master-starhopper","name":"master-starhopper"},{"id":"mental-fortress","name":"mental-fortress"},{"id":"natural-brawler","name":"natural-brawler"},{"id":"natural-charmer","name":"natural-charmer"},{"id":"natural-negotiator","name":"natural-negotiator"},{"id":"natural-doctor","name":"natural-doctor"},{"id":"natural-enforcer","name":"natural-enforcer"},{"id":"natural-hunter","name":"natural-hunter"},{"id":"natural-marksman","name":"natural-marksman"},{"id":"natural-outdoorsman","name":"natural-outdoorsman"},{"id":"natural-pilot","name":"natural-pilot"},{"id":"natural-programmer","name":"natural-programmer"},{"id":"natural-rogue","name":"natural-rogue"},{"id":"natural-scholar","name":"natural-scholar"},{"id":"natural-tinkerer","name":"natural-tinkerer"},{"id":"nobodys-fool","name":"nobodys-fool"},{"id":"overwhelm-emotions","name":"overwhelm-emotions"},{"id":"outdoorsman","name":"outdoorsman"},{"id":"plausible-deniability","name":"plausible-deniability"},{"id":"point-blank","name":"point-blank"},{"id":"precise-aim","name":"precise-aim"},{"id":"pressure-point","name":"pressure-point"},{"id":"quick-draw","name":"quick-draw"},{"id":"quick-strike","name":"quick-strike"},{"id":"rapid-reaction","name":"rapid-reaction"},{"id":"rapid-recovery","name":"rapid-recovery"},{"id":"redundant-systems","name":"redundant-systems"},{"id":"researcher","name":"researcher"},{"id":"resolve","name":"resolve"},{"id":"respected-scholar","name":"respected-scholar"},{"id":"scathing-tirade","name":"scathing-tirade"},{"id":"scathing-tirade-improved","name":"scathing-tirade-improved"},{"id":"scathing-tirade-supreme","name":"scathing-tirade-supreme"},{"id":"second-wind","name":"second-wind"},{"id":"shortcut","name":"shortcut"},{"id":"side-step","name":"side-step"},{"id":"sixth-sense","name":"sixth-sense"},{"id":"skilled-jockey","name":"skilled-jockey"},{"id":"skilled-slicer","name":"skilled-slicer"},{"id":"smooth-talker","name":"smooth-talker"},{"id":"sniper-shot","name":"sniper-shot"},{"id":"soft-spot","name":"soft-spot"},{"id":"solid-repairs","name":"solid-repairs"},{"id":"spare-clip","name":"spare-clip"},{"id":"speaks-binary","name":"speaks-binary"},{"id":"stalker","name":"stalker"},{"id":"steely-nerved","name":"steely-nerved"},{"id":"stim-application","name":"stim-application"},{"id":"stim-application-improved","name":"stim-application-improved"},{"id":"stim-application-supreme","name":"stim-application-supreme"},{"id":"street-smarts","name":"street-smarts"},{"id":"force-sense-strength","name":"Sense - Strength"},{"id":"stroke-of-genius","name":"stroke-of-genius"},{"id":"strong-arm","name":"strong-arm"},{"id":"stunning-blow","name":"stunning-blow"},{"id":"stunning-blow-improved","name":"stunning-blow-improved"},{"id":"superior-reflexes","name":"superior-reflexes"},{"id":"surgeon","name":"surgeon"},{"id":"swift","name":"swift"},{"id":"targeted-blow","name":"targeted-blow"},{"id":"technical-aptitude","name":"technical-aptitude"},{"id":"tinkerer","name":"tinkerer"},{"id":"touch-of-fate","name":"touch-of-fate"},{"id":"toughened","name":"Toughened"},{"id":"tricky-target","name":"tricky-target"},{"id":"true-aim","name":"true-aim"},{"id":"uncanny-reaction","name":"Uncanny Reactions"},{"id":"uncanny-senses","name":"uncanny-senses"},{"id":"utility-belt","name":"utility-belt"},{"id":"utinni","name":"utinni"},{"id":"well-rounded","name":"well-rounded"},{"id":"wheel-and-deal","name":"wheel-and-deal"}]`).map(parsed => {
    const instantiated = new talentModel(parsed);
    instantiated.__proto__ = talentModel.prototype;
    return instantiated;
});
talentModel.values = (talentModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in talentModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (talentModel._values || []));

specializationModel._values = JSON.parse(`[{"name":"Assassin","careerSkills":["Melee","Ranged - Heavy","Skulduggery","Stealth"],"talents":[{"id":"assassin-1","value":"grit","tier":1},{"id":"assassin-2","value":"lethal-blows","tier":1},{"id":"assassin-3","value":"stalker","tier":1},{"id":"assassin-4","value":"dodge","tier":1},{"id":"assassin-5","value":"precise-aim","tier":2,"requires":{"advancements":["assassin-1","assassin-6","assassin-9"]}},{"id":"assassin-6","value":"jump-up","tier":2,"requires":{"advancements":["assassin-2","assassin-5","assassin-7","assassin-10"]}},{"id":"assassin-7","value":"quick-strike","tier":2,"requires":{"advancements":["assassin-3","assassin-6","assassin-8","assassin-11"]}},{"id":"assassin-8","value":"quick-draw","tier":2,"requires":{"advancements":["assassin-4","assassin-7","assassin-12"]}},{"id":"assassin-9","value":"targeted-blow","tier":3,"requires":{"advancements":["assassin-5","assassin-13"]}},{"id":"assassin-10","value":"stalker","tier":3,"requires":{"advancements":["assassin-6","assassin-11","assassin-14"]}},{"id":"assassin-11","value":"lethal-blows","tier":3,"requires":{"advancements":["assassin-7","assassin-10","assassin-15"]}},{"id":"assassin-12","value":"anatomy-lessons","tier":3,"requires":{"advancements":["assassin-8","assassin-16"]}},{"id":"assassin-13","value":"stalker","tier":4,"requires":{"advancements":["assassin-9","assassin-14"]}},{"id":"assassin-14","value":"sniper-shot","tier":4,"requires":{"advancements":["assassin-10","assassin-13"]}},{"id":"assassin-15","value":"dodge","tier":4,"requires":{"advancements":["assassin-11"]}},{"id":"assassin-16","value":"lethal-blows","tier":4,"requires":{"advancements":["assassin-12"]}},{"id":"assassin-17","value":"precise-aim","tier":5,"requires":{"advancements":["assassin-13"]}},{"id":"assassin-87","value":"deadly-accuracy","tier":5,"requires":{"advancements":["assassin-12"]}},{"id":"assassin-19","value":"dedication","tier":5,"requires":{"advancements":["assassin-15"]}},{"id":"assassin-20","value":"master-of-shadows","tier":4,"requires":{"advancements":["assassin-16"]}}]},{"name":"Gadgeteer","careerSkills":["Brawl","Coercion","Mechanics","ranged - Light"],"talents":[{"id":"gadgeteer-1","value":"brace","tier":1},{"id":"gadgeteer-2","value":"toughened","tier":1},{"id":"gadgeteer-3","value":"intimidating","tier":1},{"id":"gadgeteer-4","value":"defensive-stance","tier":1},{"id":"gadgeteer-5","value":"spare-clip","tier":2,"requires":{"advancements":["gadgeteer-6"]}},{"id":"gadgeteer-6","value":"jury-rigged","tier":2,"requires":{"advancements":["gadgeteer-2"]}},{"id":"gadgeteer-7","value":"point-blank","tier":2,"requires":{"advancements":["gadgeteer-6"]}},{"id":"gadgeteer-8","value":"disorient","tier":2,"requires":{"advancements":["gadgeteer-4"]}},{"id":"gadgeteer-9","name":"toughened","tier":3,"requires":{"advancements":["gadgeteer-10"]}},{"id":"gadgeteer-10","value":"armor-master","tier":3,"requires":{"advancements":["gadgeteer-6"]}},{"id":"gadgeteer-11","value":"natural-enforcer","tier":3,"requires":{"advancements":["gadgeteer-10"]}},{"id":"gadgeteer-12","value":"stunning-blow","tier":3,"requires":{"advancements":["gadgeteer-8"]}},{"id":"gadgeteer-13","value":"jury-rigged","tier":4,"requires":{"advancements":["gadgeteer-14"]}},{"id":"gadgeteer-14","value":"tinkerer","tier":4,"requires":{"advancements":["gadgeteer-10"]}},{"id":"gadgeteer-15","value":"deadly-accuracy","tier":4,"requires":{"advancements":["gadgeteer-14"]}},{"id":"gadgeteer-16","value":"stunning-blow-improved","tier":4,"requires":{"advancements":["gadgeteer-11"]}},{"id":"intimidating","tier":5,"requires":{"advancements":["gadgeteer-18"]}},{"id":"gadgeteer-18","value":"dedication","tier":5,"requires":{"advancements":["gadgeteer-13"]}},{"id":"gadgeteer-19","value":"armor-master-Improved","tier":5,"requires":{"advancements":["gadgeteer-18"]}},{"id":"gadgeteer-20","value":"crippling-blow","tier":5,"requires":{"advancements":["gadgeteer-16"]}}]},{"name":"Survivalist","careerSkills":["Knowledge - Xenology","Perception","Resilience","Survival"],"talents":[{"id":"survivalist-1","value":"forager","tier":1},{"id":"survivalist-2","value":"stalker","tier":1},{"id":"survivalist-3","value":"outdoorsman","tier":1},{"id":"survivalist-4","value":"expert-tracker","tier":1},{"id":"survivalist-5","value":"outdoorsman","tier":2,"requires":{"advancements":["survivalist-4","survivalist-6","survivalist-9"]}},{"id":"survivalist-6","value":"swift","tier":2,"requires":{"advancements":["survivalist-2","survivalist-6","survivalist-8","survivalist-10"]}},{"id":"survivalist-7","value":"hunter","tier":2,"requires":{"advancements":["survivalist-3","survivalist-6","survivalist-8","survivalist-11"]}},{"id":"survivalist-8","value":"soft-spot","tier":2,"requires":{"advancements":["survivalist-7","survivalist-12"]}},{"id":"survivalist-9","value":"toughened","tier":3,"requires":{"advancements":["survivalist-5","survivalist-17"]}},{"id":"survivalist-10","value":"expert-tracker","tier":3,"requires":{"advancements":["survivalist-6"]}},{"id":"survivalist-11","value":"stalker","tier":3,"requires":{"advancements":["survivalist-7","survivalist-12","survivalist-15"]}},{"id":"survivalist-12","name":"natural-outdoorsman","tier":3,"requires":{"advancements":["survivalist-8","survivalist-11"]}},{"id":"survivalist-13","value":"toughened","tier":4,"requires":{"advancements":["survivalist-9","survivalist-17"]}},{"id":"survivalist-14","value":"hunter","tier":4,"requires":{"advancements":["survivalist-10"]}},{"id":"survivalist-15","value":"expert-tracker","tier":4,"requires":{"advancements":["survivalist-11","survivalist-19"]}},{"id":"survivalist-16","value":"blooded","tier":4,"requires":{"advancements":["survivalist-12"]}},{"id":"survivalist-17","value":"enduring","tier":5,"requires":{"advancements":["survivalist-13","survivalist-18"]}},{"id":"survivalist-18","value":"dedication","tier":5,"requires":{"advancements":["survivalist-17","survivalist-19"]}},{"id":"survivalist-19","value":"grit","tier":5,"requires":{"advancements":["survivalist-15","survivalist-18"]}},{"id":"survivalist-20","value":"heroic-fortitude","tier":5,"requires":{"advancements":["survivalist-16"]}}]},{"name":"Doctor","careerSkills":["Cool","Knowledge - Education","Medicine","Resilience"],"talents":[{"id":"doctor-1","value":"surgeon","tier":1},{"id":"doctor-2","value":"bacta-specialist","tier":1},{"id":"doctor-3","value":"grit","tier":1},{"id":"doctor-4","value":"resolve","tier":1},{"id":"doctor-5","value":"stim-application","tier":2,"requires":{"advancements":["doctor-1","doctor-6","doctor-9"]}},{"id":"doctor-6","value":"grit","tier":2,"requires":{"advancements":["doctor-5","doctor-7"]}},{"id":"doctor-7","value":"surgeon","tier":2,"requires":{"advancements":["doctor-3","doctor-6","doctor-8"]}},{"id":"doctor-8","value":"resolve","tier":2,"requires":{"advancements":["doctor-7","doctor-12"]}},{"id":"doctor-9","value":"surgeon","tier":3,"requires":{"advancements":["doctor-5","doctor-10","doctor-13"]}},{"id":"doctor-10","value":"grit","tier":3,"requires":{"advancements":["doctor-9","doctor-11","doctor-14"]}},{"id":"doctor-11","value":"bacta-specialist","tier":3,"requires":{"advancements":["doctor-7","doctor-10","doctor-15"]}},{"id":"doctor-12","value":"pressure-point","tier":3,"requires":{"advancements":["doctor-8"]}},{"id":"doctor-13","value":"stim-application-improved","tier":4,"requires":{"advancements":["doctor-9","doctor-17"]}},{"id":"doctor-14","value":"natural-doctor","tier":4,"requires":{"advancements":["doctor-10","doctor-18"]}},{"id":"doctor-15","value":"toughened","tier":4,"requires":{"advancements":["doctor-11","doctor-19"]}},{"id":"doctor-16","value":"anatomy-lessons","tier":4,"requires":{"advancements":["doctor-12"]}},{"id":"doctor-17","value":"stim-application-Supreme","tier":5,"requires":{"advancements":["doctor-13","doctor-18"]}},{"id":"doctor-18","value":"master-doctor","tier":5,"requires":{"advancements":["doctor-14","doctor-17","doctor-19"]}},{"id":"doctor-19","value":"dedication","tier":5,"requires":{"advancements":["doctor-15","doctor-18"]}},{"id":"doctor-20","value":"dodge","tier":5,"requires":{"advancements":["doctor-16"]}}]},{"name":"Politico","careerSkills":["Charm","Coercion","Deception","Knowledge - Core Worlds"],"talents":[{"id":"politico-1","value":"kill-with-kindness","tier":1},{"id":"politico-2","value":"grit","tier":1},{"id":"politico-3","value":"plausible-deniability","tier":1},{"id":"politico-4","value":"toughened","tier":1},{"id":"politico-5","value":"inspiring-rhetoric","tier":2,"requires":{"advancements":["politico-1","politico-6"]}},{"id":"politico-6","value":"kill-with-kindness","tier":2,"requires":{"advancements":["politico-2","politico-5"]}},{"id":"politico-7","value":"scathing-tirade","tier":2,"requires":{"advancements":["politico-3","politico-8"]}},{"id":"politico-8","value":"plausible-deniability","tier":2,"requires":{"advancements":["politico-4","politico-7"]}},{"id":"politico-9","value":"dodge","tier":3,"requires":{"advancements":["politico-4","politico-10","politico-13"]}},{"id":"politico-10","value":"inspiring-rhetoric-improved","tier":3,"requires":{"advancements":["politico-9"]}},{"id":"politico-11","value":"scathing-tirade-improved","tier":3,"requires":{"advancements":["politico-12"]}},{"id":"politico-12","value":"well-rounded","tier":3,"requires":{"advancements":["politico-8","politico-16"]}},{"id":"politico-13","value":"grit","tier":4,"requires":{"advancements":["politico-9","politico-17"]}},{"id":"politico-14","value":"inspiring-rhetoric-supreme","tier":4,"requires":{"advancements":["politico-10"]}},{"id":"politico-15","value":"scathing-tirade-supreme","tier":4,"requires":{"advancements":["politico-11"]}},{"id":"politico-16","value":"nobodys-fool","tier":4,"requires":{"advancements":["politico-12","politico-20"]}},{"id":"politico-17","value":"steely-nerved","tier":5,"requires":{"advancements":["politico-13","politico-18"]}},{"id":"politico-18","value":"dedication","tier":5,"requires":{"advancements":["politico-17","politico-19"]}},{"id":"politico-19","value":"natural-charmer","tier":5,"requires":{"advancements":["politico-18","politico-20"]}},{"id":"politico-20","value":"intense-presence","tier":5,"requires":{"advancements":["politico-16","politico-19"]}}]},{"name":"Scholar","careerSkills":["Knowledge - Outer Rim","Knowledge - Underworld","Knowledge - Xenology","Perception"],"talents":[{"id":"scholar-1","value":"respected-scholar","tier":1},{"id":"scholar-2","value":"speaks-binary","tier":1},{"id":"scholar-3","value":"grit","tier":1},{"id":"scholar-4","value":"brace","tier":1},{"id":"scholar-5","value":"researcher","tier":2,"requires":{"advancements":["scholar-1","scholar-6","scholar-9"]}},{"id":"scholar-6","value":"respected-scholar","tier":2,"requires":{"advancements":["scholar-2","scholar-5"]}},{"id":"scholar-7","value":"resolve","tier":2,"requires":{"advancements":["scholar-3","scholar-8"]}},{"id":"scholar-8","value":"researcher","tier":2,"requires":{"advancements":["scholar-4","scholar-7","scholar-12"]}},{"id":"scholar-9","value":"codebreaker","tier":3,"requires":{"advancements":["scholar-5","scholar-10"]}},{"id":"scholar-10","value":"knowledge-specialization","tier":3,"requires":{"advancements":["scholar-9","scholar-14"]}},{"id":"scholar-11","value":"natural-scholar","tier":3,"requires":{"advancements":["scholar-12","scholar-15"]}},{"id":"scholar-12","value":"well-rounded","tier":3,"requires":{"advancements":["scholar-8","scholar-11"]}},{"id":"scholar-13","value":"knowledge-specialization","tier":4,"requires":{"advancement":["scholar-14","scholar-17"]}},{"id":"scholar-14","value":"intense-focus","tier":4,"requires":{"advancements":["scholar-13","scholar-15"]}},{"id":"scholar-15","value":"confidence","tier":4,"requires":{"advancements":["scholar-11","scholar-16"]}},{"id":"scholar-16","value":"resolve","tier":4,"requires":{"advancements":["scholar-15","scholar-20"]}},{"id":"scholar-17","value":"stroke-of-genius","tier":5,"requires":{"advancements":["scholar-13","scholar-18"]}},{"id":"scholar-18","value":"mental-fortress","tier":5,"requires":{"advancements":["scholar-17","scholar-19"]}},{"id":"scholar-19","value":"dedication","tier":5,"requires":["scholar-18","scholar-20"]},{"id":"scholar-20","value":"toughened","tier":4,"requires":["scholar-16","scholar-19"]}]},{"name":"Fringer","careerSkills":["Astrogation","Coordination","Negotiation","Streetwise"],"talents":[{"id":"fringer-1","value":"galaxy-mapper","tier":1},{"id":"fringer-2","value":"street-smarts","tier":1},{"id":"fringer-3","value":"rapid-recovery","tier":1},{"id":"fringer-4","value":"street-smarts","tier":1},{"id":"fringer-5","value":"skilled-jockey","tier":2,"requires":{"advancements":["fringer-1","fringer-6","fringer-9"]}},{"id":"fringer-6","value":"galaxy-mapper","tier":2,"requires":{"advancements":["fringer-5","fringer-10"]}},{"id":"fringer-7","value":"grit","tier":2,"requires":{"advancements":["fringer-3","fringer-8","fringer-11"]}},{"id":"fringer-8","value":"toughened","tier":2,"requires":{"advancements":["fringer-4","fringer-7","fringer-12"]}},{"id":"fringer-9","value":"master-starhopper","tier":3,"requires":{"advancements":["fringer-5","fringer-10"]}},{"id":"fringer-10","value":"defensive-driving","tier":3,"requires":{"advancements":["fringer-6","fringer-9"]}},{"id":"fringer-11","value":"rapid-recovery","tier":3,"requires":{"advancements":["fringer-7"]}},{"id":"fringer-12","value":"durable","tier":3,"requires":{"advancements":["fringer-8"]}},{"id":"fringer-13","value":"rapid-recovery","tier":4,"requires":{"advancements":["fringer-14","fringer-17"]}},{"id":"fringer-14","value":"jump-up","tier":4,"requires":{"advancements":["fringer-15"]}},{"id":"fringer-15","value":"grit","tier":4,"requires":{"advancements":["fringer-11"]}},{"id":"fringer-16","value":"knockdown","tier":4,"requires":{"advancements":["fringer-12"]}},{"id":"fringer-17","value":"dedication","tier":5,"requires":{"advancements":["fringer-13","fringer-18"]}},{"id":"fringer-18","value":"toughened","tier":5,"requires":{"advancements":["fringer-14","fringer-17"]}},{"id":"fringer-19","value":"dodge","tier":5,"requires":{"advancements":["fringer-20"]}},{"id":"fringer-20","value":"dodge","tier":5,"requires":{"advancements":["fringer-16"]}}]},{"name":"Scout","careerSkills":["Athletics","Medicine","Piloting - Planetary","Survival"],"talents":[{"id":"scout-1","value":"rapid-recovery","tier":1},{"id":"scout-2","value":"stalker","tier":1},{"id":"scout-3","value":"grit","tier":1},{"id":"scout-4","value":"shortcut","tier":1},{"id":"scout-5","value":"forager","tier":2,"requires":{"advancements":["scout-1","scout-6","scout-9"]}},{"id":"scout-6","value":"quick-strike","tier":2,"requires":{"advancements":["scout-2","scout-5","scout-7","scout-10"]}},{"id":"scout-7","value":"lets-ride","tier":2,"requires":{"advancements":["scout-3","scout-6","scout-8","scout-11"]}},{"id":"scout-8","value":"disorient","tier":2,"requires":{"advancements":["scout-4","scout-7","scout-12"]}},{"id":"rapid-recovery","tier":3,"requires":{"advancements":["scout-5","scout-13"]}},{"id":"scout-10","value":"natural-hunter","tier":3,"requires":{"advancements":["scout-6"]}},{"id":"scout-11","value":"familiar-suns","tier":3,"requires":{"advancements":["scout-7","scout-15"]}},{"id":"scout-12","value":"shortcut","tier":3,"requires":{"advancements":["scout-8"]}},{"id":"scout-13","value":"grit","tier":4,"requires":{"advancements":["scout-9","scout-17"]}},{"id":"scout-14","value":"heightened-awareness","tier":4,"requires":{"advancements":["scout-10"]}},{"id":"scout-15","value":"toughened","tier":4,"requires":{"advancements":["scout-11","scout-19"]}},{"id":"scout-16","value":"quick-strike","tier":4,"requires":{"advancements":["scout-12"]}},{"id":"scout-17","value":"utility-belt","tier":5,"requires":{"advancements":["scout-13","scout-18"]}},{"id":"dedication","tier":5,"requires":{"advancements":["scout-17","scout-19"]}},{"id":"stalker","tier":5,"requires":{"advancements":["scout-18","scout-15"]}},{"id":"disorient","tier":5,"requires":{"advancements":["scout-16"]}}]},{"name":"Trader","careerSkills":["Deception","Knowledge - Core Worlds","Knowledge - Underworld","Negotiation"],"talents":[{"id":"trader-1","value":"know-somebody","tier":1},{"id":"trader-2","value":"convincing-demeanor","tier":1},{"id":"trader-3","value":"wheel-and-deal","tier":1},{"id":"trader-4","value":"smooth-talker","tier":1},{"id":"trader-5","value":"wheel-and-deal","tier":2,"requires":{"advancements":["trader-1","trader-6","trader-9"]}},{"id":"trader-6","value":"grit","tier":2,"requires":{"advancements":["trader-5","trader-7"]}},{"id":"trader-7","value":"spare-clip","tier":2,"requires":{"advancements":["trader-6"]}},{"id":"trader-8","value":"toughened","tier":2,"requires":{"advancements":["trader-7"]}},{"id":"trader-9","value":"know-somebody","tier":3,"requires":{"advancements":["trader-5"]}},{"id":"trader-10","value":"nobodys-fool","tier":3,"requires":{"advancements":["trader-9"]}},{"id":"trader-11","value":"smooth-talker","tier":3,"requires":{"advancements":["trader-10"]}},{"id":"trader-12","value":"nobodys-fool","tier":3,"requires":{"advancements":["trader-11"]}},{"id":"trader-13","value":"wheel-and-deal","tier":4,"requires":{"advancements":["trader-9"]}},{"id":"trader-14","value":"steely-nerved","tier":4,"requires":{"advancements":["trader-13"]}},{"id":"trader-15","value":"black-market-contacts","tier":4,"requires":{"advancements":["trader-14"]}},{"id":"trader-16","value":"black-market-contacts","tier":4,"requires":{"advancements":["trader-16","trader-20"]}},{"id":"trader-17","value":"know-somebody","tier":5,"requires":{"advancements":["trader-13"]}},{"id":"trader-18","value":"natural-negotiator","tier":5,"requires":{"advancements":["trader-17","trader-19"]}},{"id":"trader-19","value":"dedication","tier":5,"requires":{"advancements":["trader-18","trader-20"]}},{"id":"trader-20","value":"master-merchant","tier":5,"requires":{"advacements":["trader-16","trader-19"]}}]},{"name":"Bodyguard","careerSkills":["Gunnery","Perception","Piloting - Planetary","ranged - Heavy"],"talents":[{"id":"bodyguard-1","value":"toughened","tier":1},{"id":"bodyguard-2","value":"barrage","tier":1},{"id":"bodyguard-3","value":"durable","tier":1},{"id":"bodyguard-4","value":"grit","tier":1},{"id":"bodyguard-5","value":"body-guard","tier":2,"requires":{"advancements":["bodyguard-6"]}},{"id":"bodyguard-6","value":"hard-headed","tier":2,"requires":{"advancements":["bodyguard-2","bodyguard-7","bodyguard-10"]}},{"id":"bodyguard-7","value":"barrage","tier":2,"requires":{"advancements":["bodyguard-3","bodyguard-6","bodyguard-8"]}},{"id":"bodyguard-8","value":"brace","tier":2,"requires":{"advancements":["bodyguard-7"]}},{"id":"bodyguard-9","value":"body-guard","tier":3,"requires":{"advancements":["bodyguard-5"]}},{"id":"bodyguard-10","value":"side-step","tier":3,"requires":{"advancements":["bodyguard-6","bodyguard-11","bodyguard-14"]}},{"id":"bodyguard-11","value":"defensive-stance","tier":3,"requires":{"advancements":["bodyguard-7","bodyguard-10","bodyguard-15"]}},{"id":"bodyguard-12","value":"brace","tier":3,"requires":{"advancements":["bodyguard-8"]}},{"id":"bodyguard-13","value":"enduring","tier":4,"requires":{"advancements":["bodyguard-9"]}},{"id":"bodyguard-14","value":"side-step","tier":4,"requires":{"advancements":["bodyguard-10","bodyguard-15","bodyguard-18"]}},{"id":"bodyguard-15","value":"defensive-stance","tier":4,"requires":{"advancements":["bodyguard-11","bodyguard-14","bodyguard-19"]}},{"id":"bodyguard-16","value":"hard-headed","tier":4,"requires":{"advancements":["bodyguard-12","bodyguard-17"]}},{"id":"bodyguard-17","value":"dedication","tier":5,"requires":{"advancements":["bodyguard-18"]}},{"id":"bodyguard-18","value":"barrage","tier":5,"requires":{"advancements":["bodyguard-14","bodyguard-17"]}},{"id":"bodyguard-19","value":"toughened","tier":5,"requires":{"advancements":["bodyguard-15","bodyguard-18"]}},{"id":"bodyguard-20","value":"hard-headed-improved","tier":5,"requires":{"advancements":["bodyguard-15"]}}]},{"name":"Marauder","careerSkills":["Coercion","Melee","Resilience","Survival"],"talents":[{"id":"marauder-1","value":"toughened","tier":1},{"id":"marauder-2","value":"frenzied-attack","tier":1},{"id":"marauder-3","value":"feral-strength","tier":1},{"id":"marauder-4","value":"lethal-blows","tier":1},{"id":"marauder-5","value":"feral-strength","tier":2,"requires":{"advancements":["marauder-1","marauder-6"]}},{"id":"marauder-6","value":"toughened","tier":2,"requires":{"advancementS":["marauder-2","marauder-5","marauder-7","marauder-10"]}},{"id":"marauder-7","value":"heroic-fortitude","tier":2,"requires":{"advancements":["marauder-3","marauder-5","marauder-8","marauder-11"]}},{"id":"marauder-8","value":"knockdown","tier":2,"requires":{"advancements":["marauder-4","marauder-7"]}},{"id":"marauder-9","value":"enduring","tier":3,"requires":{"advancements":["marauder-10","marauder-13"]}},{"id":"marauder-10","value":"lethal-blows","tier":3,"requires":{"advancements":["marauder-6","marauder-9","marauder-11"]}},{"id":"marauder-11","value":"toughened","tier":3,"requires":{"advancements":["marauder-7","marauder-10","marauder-12"]}},{"id":"marauder-12","value":"frenzied-attack","tier":3,"requires":{"advancements":["marauder-11","marauder-16"]}},{"id":"marauder-13","value":"toughened","tier":4,"requires":{"advancements":["marauder-9","marauder-14"]}},{"id":"marauder-14","value":"feral-strength","tier":4,"requires":{"advancements":["marauder-13","marauder-15","marauder-18"]}},{"id":"marauder-15","value":"natural-brawler","tier":4,"requires":{"advancements":["marauder-14","marauder-16","marauder-19"]}},{"id":"marauder-16","value":"lethal-blows","tier":4,"requires":{"advancemenets":["marauder-12","marauder-15"]}},{"id":"marauder-17","value":"frenzied-attack","tier":5,"requires":{"advancements":["marauder-18"]}},{"id":"marauder-18","value":"enduring","tier":5,"requires":{"advancements":["marauder-14","marauder-19"]}},{"id":"marauder-19","value":"defensive-stance","tier":5,"requires":{"advancements":["marauder-15","marauder-18"]}},{"id":"marauder-20","value":"dedication","tier":5,"requires":{"advancements":["marauder-19"]}}]},{"name":"Mercenary Soldier","careerSkills":["Discipline","Gunnery","Leadership","ranged - Heavy"],"talents":[{"id":"mercenary-1","value":"command","tier":1},{"id":"mercenary-2","value":"second-wind","tier":1},{"id":"mercenary-3","value":"point-blank","tier":1},{"id":"mercenary-4","value":"svaluee-step","tier":1},{"id":"mercenary-5","value":"second-wind","tier":2,"requires":{"advancements":["mercenary-1","mercenary-6","mercenary-9"]}},{"id":"mercenary-6","value":"confvalueence","tier":2,"requires":{"advancements":["mercenary-2","mercenary-5","mercenary-10"]}},{"id":"mercenary-7","value":"strong-arm","tier":2,"requires":{"advancements":["mercenary-3","mercenary-8","mercenary-11"]}},{"id":"mercenary-8","value":"point-blank","tier":2,"requires":{"advancements":["mercenary-4","mercenary-7"]}},{"id":"mercenary-9","value":"field-commander","tier":3,"requires":{"advancements":["mercenary-5","mercenary-10"]}},{"id":"mercenary-10","value":"command","tier":3,"requires":{"advancements":["mercenary-6","mercenary-9","mercenary-11","mercenary-14"]}},{"id":"mercenary-11","value":"natural-marksman","tier":3,"requires":{"advancements":["mercenary-7","mercenary-10","mercenary-12","mercenary-15"]}},{"id":"mercenary-12","value":"sniper-shot","tier":3,"requires":{"advancements":["mercenary-11","mercenary-16"]}},{"id":"mercenary-13","value":"field-commander-improved","tier":4,"requires":{"advancements":["mercenary-9"]}},{"id":"mercenary-14","value":"grit","tier":4,"requires":{"advancements":["mercenary-10","mercenary-18"]}},{"id":"mercenary-15","value":"toughened","tier":4,"requires":{"advancements":["mercenary-11","mercenary-16"]}},{"id":"mercenary-16","value":"lethal-blows","tier":4,"requires":{"advancements":["mercenary-12","mercenary-15","mercenary-20"]}},{"id":"mercenary-17","value":"deadly-accuracy","tier":5,"requires":{"advancements":["mercenary-18"]}},{"id":"mercenary-18","value":"true-aim","tier":5,"requires":{"advancements":["mercenary-14","mercenary-19"]}},{"id":"mercenary-19","value":"dedication","tier":5,"requires":{"advancements":["mercenary-18","mercenary-20"]}},{"id":"mercenary-20","value":"true-aim","tier":5,"requires":{"advancements":["mercenary-16","mercenary-19"]}}]},{"name":"Pilot","careerSkills":["Astrogation","Gunnery","Piloting - Planetary","Piloting - Space"],"talents":[{"id":"pilot-1","value":"full-throttle","tier":1},{"id":"pilot-2","value":"skilled-jockey","tier":1},{"id":"pilot-3","value":"galaxy-mapper","tier":1},{"id":"pilot-4","value":"lets-rvaluee","tier":1},{"id":"pilot-5","value":"skilled-jockey","tier":2,"requires":{"advancements":["pilot-1","pilot-6","pilot-9"]}},{"id":"pilot-6","value":"dead-to-rights","tier":2,"requires":{"advancements":["pilot-2","pilot-5"]}},{"id":"pilot-7","value":"galaxy-mapper","tier":2,"requires":{"advancements":["pilot-3","pilot-8","pilot-11"]}},{"id":"pilot-8","value":"rapid-recovery","tier":2,"requires":{"advancements":["pilot-4","pilot-7","pilot-12"]}},{"id":"pilot-9","value":"full-throttle-improved","tier":3,"requires":{"advancements":["pilot-5","pilot-13"]}},{"id":"pilot-10","value":"dead-to-rights-improved","tier":3,"requires":{"advancements":["pilot-6"]}},{"id":"pilot-11","value":"grit","tier":3,"requires":{"advancements":["pilot-7","pilot-12","pilot-15"]}},{"id":"pilot-12","value":"natural-pilot","tier":3,"requires":{"advancements":["pilot-8","pilot-11","pilot-16"]}},{"id":"pilot-13","value":"grit","tier":4,"requires":{"advancements":["pilot-9","pilot-14","pilot-17"]}},{"id":"pilot-14","value":"full-throttle-supreme","tier":4,"requires":{"advancements":["pilot-13"]}},{"id":"pilot-15","value":"tricky-target","tier":4,"requires":{"advancements":["pilot-11","pilot-19"]}},{"id":"pilot-16","value":"defensive-driving","tier":4,"requires":{"advancements":["pilot-12","pilot-20"]}},{"id":"pilot-17","value":"master-pilot","tier":5,"requires":{"advancements":["pilot-13","pilot-18"]}},{"id":"pilot-18","value":"dedication","tier":5,"requires":{"advancements":["pilot-17","pilot-18"]}},{"id":"pilot-19","value":"toughened","tier":5,"requires":{"advancements":["pilot-15","pilot-18","pilot-20"]}},{"id":"pilot-20","value":"brilliant-evasion","tier":5,"requires":["pilot-16","pilot-19"]}]},{"name":"Scoundrel","careerSkills":["Charm","Cool","Deception","ranged - Light"],"talents":[{"id":"scoundrel-1","value":"black-market-contacts","tier":1},{"id":"scoundrel-2","value":"convincing-demeanor","tier":1},{"id":"scoundrel-3","value":"quick-draw","tier":1},{"id":"scoundrel-4","value":"rapid-reaction","tier":1},{"id":"scoundrel-5","value":"convincing-demeanor","tier":2,"requires":{"advancements":["scoundrel-1","scoundrel-9"]}},{"id":"scoundrel-6","value":"black-market-contacts","tier":2,"requires":{"advancements":["scoundrel-7","scoundrel-10"]}},{"id":"scoundrel-7","value":"convincing-demeanor","tier":2,"requires":{"advancements":["scoundrel-6","scoundrel-11"]}},{"id":"scoundrel-8","value":"quick-strike","tier":2,"requires":{"advancements":["scoundrel-4","scoundrel-12"]}},{"id":"scoundrel-9","value":"hidden-storage","tier":3,"requires":{"advancements":["scoundrel-5","scoundrel-13"]}},{"id":"scoundrel-10","value":"toughened","tier":3,"requires":{"advancements":["scoundrel-6","scoundrel-11","scoundrel-14"]}},{"id":"scoundrel-11","value":"black-market-contacts","tier":3,"requires":{"advancements":["scoundrel-7","scoundrel-10"]}},{"id":"scoundrel-12","value":"side-step","tier":3,"requires":{"advancementS":["scoundrel-8","scoundrel-16"]}},{"id":"scoundrel-13","value":"toughened","tier":4,"requires":{"advancements":["scoundrel-9","scoundrel-17"]}},{"id":"scoundrel-14","value":"rapid-reaction","tier":4,"requires":{"advancements":["scoundrel-10","scoundrel-15","scoundrel-18"]}},{"id":"scoundrel-15","value":"hidden-storage","tier":4,"requires":{"advancements":["scoundrel-11","scoundrel-14","scoundrel-19"]}},{"id":"scoundrel-16","value":"side-step","tier":4,"requires":{"advancements":["scoundrel-12","scoundrel-20"]}},{"id":"scoundrel-17","value":"dedication","tier":5,"requires":{"advancements":["scoundrel-13","scoundrel-18"]}},{"id":"scoundrel-18","value":"natural-charmer","tier":5,"requires":{"advancements":["scoundrel-17","scoundrel-13","scoundrel-19"]}},{"id":"scoundrel-19","value":"soft-spot","tier":5,"requires":{"advancements":["scoundrel-14","scoundrel-18","scoundrel-20"]}},{"id":"scoundrel-20","value":"quick-strike","tier":5,"requires":{"advancements":["scoundrel-16","scoundrel-19"]}}]},{"name":"Thief","careerSkills":["Computers","Skulduggery","Stealth","Vigilance"],"talents":[{"id":"thief-1","value":"street-smarts","tier":1},{"id":"thief-2","value":"black-market-contacts","tier":1},{"id":"thief-3","value":"indistinguishable","tier":1},{"id":"thief-4","value":"bypass-security","tier":1},{"id":"thief-5","value":"black-market-contacts","tier":2,"requires":{"advancements":["thief-1","thief-6","thief-9"]}},{"id":"thief-6","value":"dodge","tier":2,"requires":{"advancements":["thief-5","thief-7","thief-10"]}},{"id":"thief-7","value":"grit","tier":2,"requires":{"advancements":["thief-6","thief-8"]}},{"id":"thief-8","value":"hidden-storage","tier":2,"requires":{"advancements":["thief-4","thief-7","thief-12"]}},{"id":"thief-9","value":"stalker","tier":3,"requires":{"advancements":["thief-5","thief-10","thief-13"]}},{"id":"thief-10","value":"grit","tier":3,"requires":{"advancements":["thief-6","thief-9","thief-11","thief-14"]}},{"id":"thief-11","value":"rapid-reaction","tier":3,"requires":{"advancements":["thief-7","thief-10","thief-12","thief-15"]}},{"id":"thief-12","value":"shortcut","tier":3,"requires":{"advancements":["thief-8","thief-11","thief-16"]}},{"id":"thief-13","value":"bypass-security","tier":4,"requires":{"advancements":["thief-9"]}},{"id":"thief-14","value":"Natural Rogue","tier":4,"requires":{"advancements":["thief-10","thief-15","thief-18"]}},{"id":"thief-15","value":"street-smarts","tier":4,"requires":{"advancements":["thief-11","thief-14","thief-16","thief-19"]}},{"id":"thief-16","value":"jump-up","tier":4,"requires":{"advancements":["thief-12","thief-15"]}},{"id":"thief-17","value":"master-of-shadows","tier":5,"requires":{"advancements":["thief-13"]}},{"id":"thief-18","value":"dodge","tier":5,"requires":{"advancements":["thief-14","thief-19"]}},{"id":"thief-19","value":"indistinguishable","tier":5,"requires":{"advancements":["thief-15","thief-18"]}},{"id":"thief-20","value":"dedication","tier":5,"requires":{"advancements":["thief-16"]}}]},{"name":"Mechanic","careerSkills":["Brawl","Mechanics","Piloting - Space","Skulduggery"],"talents":[{"id":"mechanic-1","value":"gearhead","tier":1},{"id":"mechanic-2","value":"toughened","tier":1},{"id":"mechanic-3","value":"fine-tuning","tier":1},{"id":"mechanic-4","value":"solid-repairs","tier":1},{"id":"mechanic-5","value":"redundant-systems","tier":2,"requires":{"advancements":["mechanic-1","mechanic-6","mechanic-9"]}},{"id":"mechanic-6","value":"solid-repairs","tier":2,"requires":{"advancements":["mechanic-2","mechanic-5","mechanic-7","mechanic-10"]}},{"id":"mechanic-7","value":"gearhead","tier":2,"requires":{"advancements":["mechanic-3","mechanic-6","mechanic-8","mechanic-11"]}},{"id":"mechanic-8","value":"grit","tier":2,"requires":{"advancements":["mechanic-4","mechanic-7","mechanic-12"]}},{"id":"mechanic-9","value":"solid-repairs","tier":3,"requires":{"advancements":["mechanic-5","mechanic-10","mechanic-13"]}},{"id":"mechanic-10","value":"enduring","tier":3,"requires":{"advancements":["mechanic-6","mechanic-9","mechanic-11","mechanic-14"]}},{"id":"mechanic-11","value":"bad-motivator","tier":3,"requires":{"advancements":[6,9,11]}},{"id":"mechanic-12","value":"toughened","tier":3,"requires":{"advancements":["mechanic-8","mechanic-11","mechanic-16"]}},{"id":"mechanic-13","value":"contraption","tier":4,"requires":{"advancements":["mechanic-9","mechanic-14"]}},{"id":"mechanic-14","value":"solid-repairs","tier":4,"requires":{"advancements":["mechanic-10","mechanic-13","mechanic-15","mechanic-18"]}},{"id":"mechanic-15","value":"fine-tuning","tier":4,"requires":{"advancements":["mechanic-11","mechanic-14","mechanic-19"]}},{"id":"mechanic-16","value":"hard-headed","tier":4,"requires":{"advancements":["mechanic-12"]}},{"id":"mechanic-17","value":"natural-tinkerer","tier":5,"requires":{"advancements":["mechanic-13"]}},{"id":"mechanic-18","value":"hold-together","tier":5,"requires":{"advancements":["mechanic-14"]}},{"id":"mechanic-19","value":"dedication","tier":5,"requires":{"advancements":["mechanic-15"]}},{"id":"mechanic-20","value":"hard-headed-improved","tier":5,"requires":{"advancements":["mechanic-16"]}}]},{"name":"Outlaw Tech","careerSkills":["Knowledge - Education","Knowledge - Underworld","Mechanics","Streetwise"],"talents":[{"id":"outlaw-tech-1","value":"tinkerer","tier":1},{"id":"outlaw-tech-2","value":"utinni","tier":1},{"id":"outlaw-tech-3","value":"speaks-binary","tier":1},{"id":"outlaw-tech-4","value":"tinkerer","tier":1},{"id":"outlaw-tech-5","value":"solid-repairs","tier":2,"requires":{"advancements":["outlaw-tech-1","outlaw-tech-6","outlaw-tech-9"]}},{"id":"outlaw-tech-6","value":"grit","tier":2,"requires":{"advancements":["outlaw-tech-2","outlaw-tech-5","outlaw-tech-7","outlaw-tech-10"]}},{"id":"outlaw-tech-7","value":"utinni","tier":2,"requires":{"advancements":["outlaw-tech-3","outlaw-tech-6","outlaw-tech-8","outlaw-tech-11"]}},{"id":"outlaw-tech-8","value":"toughened","tier":2,"requires":{"advancements":["outlaw-tech-4","outlaw-tech-7","outlaw-tech-12"]}},{"id":"outlaw-tech-9","value":"utility-belt","tier":3,"requires":{"advancements":["outlaw-tech-5","outlaw-tech-10","outlaw-tech-13"]}},{"id":"outlaw-tech-10","value":"side-step","tier":3,"requires":{"advancements":["outlaw-tech-6","outlaw-tech-9","outlaw-tech-11","outlaw-tech-14"]}},{"id":"outlaw-tech-11","value":"brace","tier":3,"requires":{"advancements":["outlaw-tech-7","outlaw-tech-10","outlaw-tech-12","outlaw-tech-15"]}},{"id":"outlaw-tech-12","value":"defensive-stance","tier":3,"requires":{"advancements":["outlaw-tech-8","outlaw-tech-11","outlaw-tech-16"]}},{"id":"outlaw-tech-13","value":"Jury Rigged","tier":4,"requires":{"advancements":["outlaw-tech-9","outlaw-tech-14","outlaw-tech-17"]}},{"id":"outlaw-tech-14","value":"speaks-binary","tier":4,"requires":{"advancements":["outlaw-tech-10","outlaw-tech-13","outlaw-tech-15"]}},{"id":"outlaw-tech-15","value":"Inventor","tier":4,"requires":{"advancements":["outlaw-tech-11","outlaw-tech-14","outlaw-tech-19"]}},{"id":"outlaw-tech-16","value":"Jury Rigged","tier":4,"requires":{"advancements":["outlaw-tech-12","outlaw-tech-20"]}},{"id":"outlaw-tech-17","value":"Inventor","tier":5,"requires":{"advancements":["outlaw-tech-13","outlaw-tech-18"]}},{"id":"outlaw-tech-18","value":"dedication","tier":5,"requires":{"advancements":["outlaw-tech-17"]}},{"id":"outlaw-tech-19","value":"known-schematic","tier":5,"requires":{"advancements":["outlaw-tech-15","outlaw-tech-20"]}},{"id":"outlaw-tech-20","value":"brace","tier":5,"requires":{"advancements":["outlaw-tech-16","outlaw-tech-19"]}}]},{"name":"Slicer","careerSkills":["Computers","Skulduggery","Stealth","Vigilance"],"talents":[{"id":"slicer-1","value":"codebreaker","tier":1},{"id":"slicer-2","value":"grit","tier":1},{"id":"slicer-3","value":"technical-aptitude","tier":1},{"id":"slicer-4","value":"bypass-security","tier":1},{"id":"slicer-5","value":"defensive-slicing","tier":2,"requires":{"advancements":["slicer-1","slicer-9"]}},{"id":"slicer-6","value":"technical-aptitude","tier":2,"requires":{"advancements":["slicer-7","slicer-10"]}},{"id":"slicer-7","value":"grit","tier":2,"requires":{"advancements":["slicer-6","slicer-8","slicer-11"]}},{"id":"slicer-8","value":"bypass-security","tier":2,"requires":{"advancements":["slicer-7","slicer-12"]}},{"id":"slicer-9","value":"natural-programmer","tier":3,"requires":{"advancements":["slicer-5","slicer-13"]}},{"id":"slicer-10","value":"bypass-security","tier":3,"requires":{"advancements":["slicer-6","slicer-11","slicer-14"]}},{"id":"slicer-11","value":"defensive-slicing","tier":3,"requires":["slicer-7","slicer-10","slicer-12","slicer-15"]},{"id":"slicer-12","value":"grit","tier":3,"requires":{"advancements":["slicer-8","slicer-11","slicer-16"]}},{"id":"slicer-13","value":"defensive-slicing","tier":4,"requires":{"advancements":["slicer-9","slicer-14","slicer-17"]}},{"id":"slicer-14","value":"defensive-slicing-improved","tier":4,"requires":{"advancements":["slicer-10","slicer-13","slicer-15","slicer-20"]}},{"id":"slicer-15","value":"codebreaker","tier":4,"requires":{"advancements":["slicer-11","slicer-14","slicer-16","slicer-19"]}},{"id":"slicer-16","value":"resolve","tier":4,"requires":{"advancements":["slicer-12","slicer-15","slicer-20"]}},{"id":"slicer-17","value":"skilled-slicer","tier":5,"requires":{"advancements":["slicer-14","slicer-18"]}},{"id":"slicer-18","value":"master-slicer","tier":5,"requires":{"advancements":["slicer-14","slicer-17","slicer-19"]}},{"id":"slicer-19","value":"mental-fortress","tier":5,"requires":{"advancements":["slicer-15","slicer-16","slicer-20"]}},{"id":"slicer-20","value":"dedication","tier":5,"requires":{"advancements":["slicer-16","slicer-19"]}}]},{"name":"Force Sensitive Exile","careerSkills":[],"talents":[{"id":"force-sensitive-1","value":"uncanny-senses","tier":1,"requires":{"forceRating":1}},{"id":"force-sensitive-2","value":"insight","tier":1,"requires":{"forceRating":1}},{"id":"force-sensitive-3","value":"forager","tier":1},{"id":"force-sensitive-4","value":"uncanny-reaction","tier":1,"requires":{"forceRating":1}},{"id":"force-sensitive-5","value":"convincing-demeanor","tier":2,"requires":{"advancements":["force-sensitive-1"]}},{"id":"force-sensitive-6","value":"overwhelm-emotions","tier":2,"requires":{"forceRating":1}},{"id":"force-sensitive-7","value":"intense-focus","tier":2},{"id":"force-sensitive-8","value":"quick-draw","tier":2,"requires":{"advancements":["force-sensitive-4"]}},{"id":"force-sensitive-9","value":"force-sense-danger","tier":3,"requires":{"advancements":["force-sensitive-5","force-sensitive-13"],"forceRating":1}},{"id":"force-sensitive-10","value":"force-sense-emotions","tier":3,"requires":{"advancements":["force-sensitive-6"],"forceRating":1}},{"id":"force-sensitive-11","value":"balance","tier":3,"requires":{"advancements":["force-sensitive-7","force-sensitive-15"],"forceRating":1}},{"id":"force-sensitive-12","value":"touch-of-fate","tier":3,"requires":{"advancements":["force-sensitive-8","force-sensitive-16"],"forceRating":1}},{"id":"force-sensitive-13","value":"street-smarts","tier":4,"requires":{"advancements":["force-sensitive-9","force-sensitive-14","force-sensitive-17"]}},{"id":"force-sensitive-14","value":"uncanny-senses","tier":4,"requires":{"advancements":["force-sensitive-10","force-sensitive-13","force-sensitive-15","force-sensitive-18"],"forceRating":1}},{"id":"force-sensitive-15","value":"uncanny-reaction","tier":4,"requires":{"advancements":["force-sensitive-11","force-sensitive-14","force-sensitive-16","force-sensitive-19"],"forceRating":1}},{"id":"force-sensitive-16","value":"street-smarts","tier":4,"requires":{"advancements":["force-sensitive-12","force-sensitive-15","force-sensitive-20"]}},{"id":"force-sensitive-17","value":"sixth-sense","tier":5,"requires":{"advancements":["force-sensitive-13","force-sensitive-16","force-sensitive-17"]}},{"id":"force-sensitive-18","value":"forceRating","tier":5,"requires":{"advancements":["force-sensitive-14","force-sensitive-17","force-sensitive-19"],"forceRating":1}},{"id":"force-sensitive-19","value":"dedication","tier":5,"requires":{"advancements":["force-sensitive-15","force-sensitive-18","force-sensitive-20"]}},{"id":"force-sensitive-20","value":"superior-reflexes","tier":5,"requires":{"advancements":["force-sensitive-16","force-sensitive-19"]}},{"id":"force-sense-1","value":"force-sense-basic-power","tier":2,"requires":{"forceRating":1}},{"id":"force-sense-2","value":"force-sense-control-evasion","tier":2,"requires":{"advancements":["force-sense-1"],"forceRating":1}},{"id":"force-sense-3","value":"force-sense-duration","tier":2,"requires":{"advancements":["force-sense-2"],"forceRating":1}},{"id":"force-sense-4","value":"force-sense-strength","tier":2,"requires":{"advancements":["force-sense-3"],"forceRating":1}},{"id":"force-sense-5","value":"force-sense-control-accuracy","tier":2,"requires":{"advancements":["force-sense-4"],"forceRating":1}},{"id":"force-sense-6","value":"force-sense-control-telepathy","tier":2,"requires":{"advancements":["force-sense-1"],"forceRating":1}},{"id":"force-sense-7","value":"force-sense-range","tier":2,"requires":{"advancements":["force-sense-7"],"forceRating":1}},{"id":"force-sense-8","value":"force-sense-range","tier":2,"requires":{"advancements":["force-sense-7"],"forceRating":1}},{"id":"force-sense-9","value":"force-sense-range","tier":2,"requires":{"advancements":["force-sense-8"]}},{"id":"force-sense-10","value":"force-sense-magnitude","tier":2,"requires":{"advancements":["force-sense-6"]}},{"id":"force-sense-11","value":"force-sense-magnitude","tier":2,"requires":{"advancements":["force-sense-10"],"forceRating":1}},{"id":"force-sense-12","value":"force-sense-magnitude","tier":2,"requires":{"advancements":["force-sense-11"],"forceRating":1}},{"id":"force-influence-1","value":"force-influence-basic-power","tier":2,"requires":{"forceRating":1}},{"id":"force-influence-2","value":"force-influence-range","tier":1,"requires":{"advancements":["force-influence-1"],"forceRating":1}},{"id":"force-influence-3","value":"force-influence-magnitude","tier":1,"requires":{"advancements":["force-influence-1"],"forceRating":1}},{"id":"force-influence-4","value":"force-influence-control-emotion","tier":2,"requires":{"advancements":["force-influence-1"],"forceRating":1}},{"id":"force-influence-5","value":"force-influence-control-charisma","tier":3,"requires":{"advancements":["force-influence-2","force-influence-3"],"forceRating":1}},{"id":"force-influence-6","value":"force-influence-strength","tier":2,"requires":{"advancements":["force-influence-4"]}},{"id":"force-influence-7","value":"force-influence-range","tier":2,"requires":{"advancement":["force-influence-5"]}},{"id":"force-influence-8","value":"force-influence-magnitude","tier":1,"requires":{"advancements":["force-influence-5"],"forceRating":1}},{"id":"force-influence-9","value":"force-influence-duration","tier":1,"requires":{"advancements":["force-influence-10"],"forceRating":1}},{"id":"force-influence-10","value":"force-influence-duration","tier":1,"requires":{"advancements":["force-influence-6"],"forceRating":1}},{"id":"force-influence-11","value":"force-influence-range","tier":2,"requires":{"advancements":["force-influence-7"],"forceRating":1}},{"id":"force-influence-12","value":"force-influence-magnitude","tier":2,"requires":{"advancements":["force-influence-8"],"forceRating":1}},{"id":"force-influence-13","value":"force-influence-duration","tier":1,"requires":{"advancements":["force-influence-9","force-influence-14"],"forceRating":1}},{"id":"force-influence-14","value":"force-influence-duration","tier":1,"requires":{"advancements":["force-influence-10","force-influence-13"],"forceRating":1}},{"id":"force-move-1","value":"force-move-basic-power","tier":2,"requires":{"forceRating":1}},{"id":"force-move-2","value":"force-move-magnitude","tier":1,"requires":{"advancements":["force-move-1"],"forceRating":1}},{"id":"force-move-3","value":"force-move-strength","tier":2,"requires":{"advancements":["force-move-1"],"forceRating":1}},{"id":"force-move-4","value":"force-move-range","tier":1,"requires":{"advancements":["force-move-1"],"forceRating":1}},{"id":"force-move-5","value":"force-move-range","tier":1,"requires":{"advancements":["force-move-1"],"forceRating":1}},{"id":"force-move-6","value":"force-move-magnitude","tier":1,"requires":{"advancements":["force-move-2"],"forceRating":1}},{"id":"force-move-7","tier":2,"value":"force-move-strength","requires":{"advancements":["force-move-3"],"forceRating":1}},{"id":"force-move-8","value":"force-move-control-throw","tier":2,"requires":{"advancements":["force-move-4","force-move-5"],"forceRating":1}},{"id":"force-move-9","value":"force-move-magnitude","tier":2,"requires":{"advancements":["force-move-6"],"forceRating":1}},{"id":"force-move-10","value":"force-move-strength","tier":3,"requires":{"advancements":["force-move-1"],"forceRating":1}},{"id":"force-move-11","value":"force-move-control-pull","tier":1,"requires":{"advancements":["force-move-7","force-move-15"],"force=rating":1}},{"id":"force-move-12","value":"force-move-range","tier":3,"requires":{"advancements":["force-move-8","force-move-15"],"forceRating":1}},{"id":"force-move-13","value":"force-move-magnitude","tier":2,"requires":{"advancements":["force-move-9"],"forceRating":1}},{"id":"force-move-14","value":"force-move-strength","tier":4,"requires":{"advancements":["force-move-10"],"forceRating":1}},{"id":"force-move-15","value":"force-move-control-fine","tier":3,"requires":{"advancements":["force-move-12","force-move-11"],"forceRating":1}}]}]`).map(parsed => {
    const instantiated = new specializationModel(parsed);
    instantiated.__proto__ = specializationModel.prototype;
    return instantiated;
});
specializationModel.values = (specializationModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in specializationModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (specializationModel._values || []));

careerModel._values = JSON.parse(`[{"name":"Bounty Hunter","careerSkills":["Athletics","Brawl","Perception","Piloting - Planetary","Piloting - Space","Ranged - Heavy","Streetwise","Streetwise","Vigilance"],"specializations":["Assassin","Gadgeteer","Survivalist"]},{"name":"Colonist","careerSkills":["Charm","Deception","Knowledge - Core Worlds","Knowledge - Education","Knowledge - Lore","Leadership","Negotiation","Streetwise"],"specializations":["Doctor","Politico","Scholar"]},{"name":"Explorer","careerSkills":["Astrogation","Cool","Knowledge - Lore","Knowledge - Outer Rim","Knowledge - Xenology","Perception","Piloting - Space","Survival"],"specializations":["Fringer","Scout","Trader"]},{"name":"Hired Gun","careerSkills":["Athletics","Brawl","Discipline","Melee","Piloting - Planetary","Ranged - Light","Resilience","Vigilance"],"specializations":["Bodyguard","Marauder","Mercenary Soldier"]},{"name":"Smuggler","careerSkills":["Coordination","Deception","Knowledge - Underworld","Perception","Piloting - Space","Skulduggery","Streetwise","Vigilance"],"specializations":["Pilot","Scoundrel","Thief"]},{"name":"Technician","careerSkills":["Astrogation","Computers","Coordination","Discipline","Knowledge - Outer Rim","Mechanics","Perception","Piloting - Planetary"],"specializations":["Mechanic","Outlaw Tech","Slicer"]}]`).map(parsed => {
    const instantiated = new careerModel(parsed);
    instantiated.__proto__ = careerModel.prototype;
    return instantiated;
});
careerModel.values = (careerModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in careerModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (careerModel._values || []));

specialAbilityModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new specialAbilityModel(parsed);
    instantiated.__proto__ = specialAbilityModel.prototype;
    return instantiated;
});
specialAbilityModel.values = (specialAbilityModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in specialAbilityModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (specialAbilityModel._values || []));

characteristicsModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new characteristicsModel(parsed);
    instantiated.__proto__ = characteristicsModel.prototype;
    return instantiated;
});
characteristicsModel.values = (characteristicsModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in characteristicsModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (characteristicsModel._values || []));

defenseModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new defenseModel(parsed);
    instantiated.__proto__ = defenseModel.prototype;
    return instantiated;
});
defenseModel.values = (defenseModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in defenseModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (defenseModel._values || []));

speciesModel._values = JSON.parse(`[{"name":"Bothan","plural":"Bothans","source":"core","baseCharacteristics":{"brawn":1,"agility":2,"intellect":2,"cunning":3,"willpower":2,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":11,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Streetwise"],"startingTalents":["convincing-demeanor"],"specialAbilities":[{"name":"Streetwise","description":"Bothans begin the game with one rank in Streetwise. They still may not train Streetwise above rank 2 during character creation. They also start with one rank in the Convincing Demeanor talent."}]},{"name":"Droid","plural":"Droids","source":"core","baseCharacteristics":{"brawn":1,"agility":1,"intellect":1,"cunning":1,"willpower":1,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":175,"startingCareerSkillChoices":6,"firstspecialtytrainedskills":4,"specialAbilities":[{"name":"Droid","description":"Droids do not need to east, sleep or breath and are unaffected by toxins or poisons. Droids have a cybernetic implant cap of 6 instead of their Brawn."},{"name":"Inorganic","description":"Since droids are inorganic, they do not gain the benefits of recovering with bacta tank, stimpack or Medicine care."},{"name":"Mechanical Being","description":"Droids cannot become force sensitive, nor acquire a Force Rating by any means. Droids cannot use Force Powers and also cannot be affected by mind altering powers."}]},{"name":"Gand - Lunged","plural":"Gand","source":"core","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":2,"willpower":3,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":110,"startingSkills":["Discipline"],"specialAbilities":[{"name":"Lunged Gand","description":"Gand with lungs breathe an ammonia mixture. They start with 10xp, breathing apparatus and treat oxygen as a dangerous atmosphere with rating 8."}]},{"name":"Gand - Lungless","plural":"Gand","source":"core","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":2,"willpower":3,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Discipline"],"specialAbilities":[{"name":"Lungless Gand","description":"Gand without lungs gain all metabolic requirements from food. They cannot suffocate but suffer the normal effects from exposure to vacuum."}]},{"name":"Human","plural":"Humans","source":"core","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":110,"startingnoniscareerskillchoices":2,"specialAbilities":[{"name":"Starting Skills","description":"Humans start the game with one rank in two non-career skills of their choice."}]},{"name":"Rodian","plural":"Rodians","source":"source","baseCharacteristics":{"brawn":2,"agility":3,"intellect":2,"cunning":2,"willpower":1,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Survival"],"specialAbilities":[{"name":"Survival Training","description":"Rodians begin with 1 rank of Survival"}]},{"name":"Trandoshan","plural":"Trandoshans","source":"core","baseCharacteristics":{"brawn":3,"agility":1,"intellect":2,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":12,"characteristic":"brawn"},"strainThreshold":{"base":9,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Perception"],"specialAbilities":[{"name":"Regeneration","description":"Whenever a Trandoshan would recover one or more wounds from natural healing or bacta tank treatment, they recover one additional Wound. They do not gain any additional wounds when receiving first aid or medical care from a character or when using a stimpack. Trandoshans may regrow lost limbs though it may take up to a month for the limb to be usable again."},{"name":"Claws","description":"When a Trandoshan makes Brawl checks to deal damage to an opponent, they deal +1 damage and have a critical range of 3."}]},{"name":"Twi'Lek","plural":"Twi'Leks","source":"core","baseCharacteristics":{"brawn":1,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":3},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":11,"characteristic":"willpower"},"startingExperience":100,"startingSkills":[{"options":["Charm","Deception"],"choices":1}],"specialAbilities":[{"name":"Twi'Lek","description":"When making skill checks, Twi'leks may remove ■ due to arid or hot conditions."}]},{"name":"Wookie","plural":"Wookies","source":"core","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":1,"presence":2},"woundsThreshold":{"base":14,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":90,"startingSkills":["Brawl"],"specialAbilities":[{"name":"Wookie Rage","description":"When a Wookie has suffered any wounds, they deal +1 damage with Brawl and Melee attacks"}]},{"name":"Aqualish - Aquala","plural":"Aqualish","source":"dangerous-covenants","baseCharacteristics":{"brawn":3,"agility":2,"intellect":1,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":90,"startingSkills":["Brawl","Resilience"],"specialAbilities":[{"name":"Aquala","description":"Aquala may remove ■ due to any cold or wet condititions."}]},{"name":"Aqualish -  Ualaq","plural":"Aqualish","source":"dangerous-covenants","baseCharacteristics":{"brawn":3,"agility":2,"intellect":1,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":90,"startingSkills":["Brawl",{"options":["Survival","Perception"],"choices":1}],"specialAbilities":[{"name":"Ualaq","description":"Aquala may remove ■ due to dark condititions but suffer ■ in brightly lit environments."}]},{"name":"Aqualish - Quara","plural":"Aqualish","source":"dangerous-covenants","baseCharacteristics":{"brawn":3,"agility":2,"intellect":1,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":90,"startingSkills":["Brawl",{"options":["Athletics","Coercion"],"choices":1}],"specialAbilities":[{"name":"Quara","description":"Quara may remove ■ when attempting to track through a natural environment."}]},{"name":"Klatoonian","plural":"Klatoonian","source":"dangerous-covenants","baseCharacteristics":{"brawn":2,"agility":3,"intellect":2,"cunning":2,"willpower":1,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":[{"options":["Brawl","Ranged - Heavy","Ranged - Light"],"choices":1}],"startingnoniscareerskillchoices":1,"specialAbilities":[]},{"name":"Weequay","plural":"Weequay","source":"dangerous-covenants","baseCharacteristics":{"brawn":3,"agility":2,"intellect":1,"cunning":3,"willpower":2,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":9,"characteristic":"willpower"},"startingExperience":90,"startingSkills":[{"options":["Resilience","Athletics"],"choices":1}],"specialAbilities":[{"name":"Pheromones","description":"Weequay can communicate with each other using pheremones. This is completely non-verbal and undetectable to any other species. Weequays can only communicate like this if they are within short range of each other."}]},{"name":"Chiss","plural":"Chiss","source":"enter-the-unknown","baseCharacteristics":{"brawn":2,"agility":2,"intellect":3,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Cool"],"specialAbilities":[{"name":"Infravision","description":"Chiss have adapted to be able to see in both the infrared and normal visible spectrum. Chiss remove up to ■ added to checks by lighting connections."}]},{"name":"Duro","plural":"Duros","source":"enter-the-unknown","baseCharacteristics":{"brawn":1,"agility":2,"intellect":3,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Piloting - Space"],"specialAbilities":[{"name":"Infravision","description":"Chiss have adapted to be able to see in both the infrared and normal visible spectrum. Chiss remove up to ■ added to checks by lighting connections."}]},{"name":"Toydarian","plural":"Toydarians","source":"enter-the-unknown","baseCharacteristics":{"brawn":1,"agility":1,"intellect":2,"cunning":2,"willpower":3,"presence":3},"woundsThreshold":{"base":9,"characteristic":"brawn"},"strainThreshold":{"base":12,"characteristic":"willpower"},"startingExperience":100,"specialAbilities":[{"name":"Small","description":"Toydarians are smaller than average and count as silhouette 1."},{"name":"Hover","description":"Toydarians have wings that allow them to hover slightly off the ground. Toydarians do not have to spend additional maneuvers when navigating difficult terrain."}]},{"name":"Arcona","plural":"Arcona","source":"far-horizons","baseCharacteristics":{"brawn":1,"agility":2,"intellect":2,"cunning":2,"willpower":3,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Vigilance"],"specialAbilities":[{"name":"Arcona","description":"Arcona may remove ■ due to arid or hot environmental conditions."},{"name":"Mood Readers","description":"Arcona add [Triumph] to any Charm or Negotiation checks they make."}]},{"name":"Chevin","plural":"Chevin","source":"far-horizons","baseCharacteristics":{"brawn":3,"agility":1,"intellect":2,"cunning":3,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":11,"characteristic":"willpower"},"startingExperience":80,"startingSkills":["Negotiation"],"startingTalents":["durable"],"specialAbilities":[{"name":"Advanced Olfaction","description":"A Chevin's keen sense of smell adds □ to Perception checks involving the sense of smell."}]},{"name":"Gran","plural":"Gran","source":"far-horizons","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":1,"willpower":2,"presence":3},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":9,"characteristic":"willpower"},"startingExperience":100,"startingSkills":[{"options":["Charm","Negotiation"],"choices":1}],"specialAbilities":[{"name":"Enhanced Vision","description":"When making ranged combat or Perception checks, Gran remove up to ■ ■ due to environmental conditions or concealment, but not defense."}]},{"name":"Faleen","plural":"Faleen","source":"fly-casual","baseCharacteristics":{"brawn":1,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":3},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":12,"characteristic":"willpower"},"startingExperience":90,"startingSkills":["Charm"],"specialAbilities":[{"name":"Beguiling Pheromones","description":"Once per check as an incidental, a Faleen may suffer 2 strain to upgrade the ability of a Charm, Deception or Negotiation check against a living sentient being within a short range once. This ability has no effect on targets wearing breath masks or without respiratory systems."}]},{"name":"Gotal","plural":"Gotals","source":"fly-casual","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":3,"willpower":2,"presence":1},"woundsThreshold":{"base":9,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Perception"],"specialAbilities":[{"name":"Energy Sensitivity","description":"The head cones of a Gotal are finely tuned sensory organs used to detect almost the entirety of the electromagnetic spectrum. Once per encounter as a maneuver, a Gotal may sense and current emotional states of all living things within short range of himself."}]},{"name":"Quarren","plural":"Quarren","source":"fly-casual","baseCharacteristics":{"brawn":2,"agility":2,"intellect":1,"cunning":2,"willpower":3,"presence":2},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":8,"characteristic":"willpower"},"startingExperience":95,"startingSkills":["Negotiation"],"specialAbilities":[{"name":"Amphibious","description":"Quarren can breathe underwater without penalty and never suffer movement penalties for traveling through water."},{"name":"Ink Spray","description":"Quarren can spit ink from a specialized sac within their gills that disperses in water, creating a brief murk. Once per counter, as an out-of-turn incidental, a Quarren may suffer 2 strain to add ■  to a combat check made by a character within short range (under water, it adds ■ ■ ■ to the combat check instead.)"}]},{"name":"Hutt","plural":"Hutts","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":1,"intellect":2,"cunning":2,"willpower":3,"presence":2},"woundsThreshold":{"base":13,"characteristic":"brawn"},"strainThreshold":{"base":11,"characteristic":"willpower"},"startingExperience":70,"startingSkills":[{"options":["Coercion","Discipline"],"choices":1}],"startingTalents":["enduring","nobodys-fool"],"specialAbilities":[{"name":"Ponderous","description":"A Hutt can never spend more than one maneuver moving per turn."}]},{"name":"Gank","plural":"Ganks","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":2,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":10,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":110,"startingSkills":[{"options":["Coercion","Vigilance"],"choices":1}],"specialAbilities":[{"name":"Cyborg","description":"All Ganks are cyborgs and each one often possesses several different cybernetic implants. A Gank beings play with up to two cybernetics that cost a total of up to 5,000 credits. If the character taks on additonal Obligation for credits at character creation, he may apply these extra funds to the 5,000 credit budgest to purchase cybernetics. Ganks have a cybernetic implant cap of 3 plus Brawn rating."}]},{"name":"Nikto - Red","plural":"Niktos","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"specialAbilities":[{"name":"Red Nikto","description":"When making skill checks, Red Niktos may remove ■ due to arid or hot environmental conditions."}],"startingSkills":["Resilience"]},{"name":"Nikto - Green","plural":"Niktos","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Coordination"],"specialAbilities":[{"name":"Green Nikto","description":"Green Niktos gain □ to Atheltics checks made to climb trees and other surfaces their claws can pierce."},{"name":"Claws","description":"When a Green Nikto makes Brawl checks to deal damage to an opponent, they deal +1 damage and have a Critical Rating of 3."}]},{"name":"Nikto - Mountain","plural":"Niktos","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Survival"],"startingTalents":["natural-outdoorsman"],"specialAbilities":[]},{"name":"Nikto - Pale","plural":"Niktos","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Athletics"],"specialAbilities":[{"name":"Swimmer","description":"A Pale Nikto never suffers movement penalties for travelling through water and can hold their breath for a number of rounds = to twice their Brawn rating before beginning to drown."}]},{"name":"Nikto - Southern","plural":"Niktos","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":3,"agility":2,"intellect":2,"cunning":2,"willpower":2,"presence":1},"woundsThreshold":{"base":11,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingExperience":100,"startingSkills":["Athletics"],"specialAbilities":[{"name":"Perceptive","description":"Southern Niktos may add □ to Perception and Vigilance checks to detect sounds."}]},{"name":"Sakiyan","plural":"Sakiyans","source":"lords-of-nal-hutta","baseCharacteristics":{"brawn":2,"agility":2,"intellect":3,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"base":8,"characteristic":"brawn"},"strainThreshold":{"base":10,"characteristic":"willpower"},"startingSkills":[{"options":["Perception","Vigilance"],"choices":1}],"startingExperience":80,"startingTalents":["expert-tracker"],"specialAbilities":[]},{"name":"Drall","plural":"Drall","source":"loads-of-nal-hutta","baseCharacteristics":{"brawn":1,"agility":1,"intellect":4,"cunning":2,"willpower":2,"presence":2},"woundsThreshold":{"characteristic":"brawn","base":8},"strainThreshold":{"characteristic":"willpower","base":12},"startingExperience":90,"startingSkills":["Knowledge - Education"],"specialAbilities":[{"name":"Drall","description":"Drall have a mind for problems and their solutions. In addition to using his skill or characteristic rating, a Drall adds □ to the dicepool when providing skilled assistance."}]}]`).map(parsed => {
    const instantiated = new speciesModel(parsed);
    instantiated.__proto__ = speciesModel.prototype;
    return instantiated;
});
speciesModel.values = (speciesModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in speciesModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (speciesModel._values || []));

strainThresholdModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new strainThresholdModel(parsed);
    instantiated.__proto__ = strainThresholdModel.prototype;
    return instantiated;
});
strainThresholdModel.values = (strainThresholdModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in strainThresholdModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (strainThresholdModel._values || []));

woundsThresholdModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new woundsThresholdModel(parsed);
    instantiated.__proto__ = woundsThresholdModel.prototype;
    return instantiated;
});
woundsThresholdModel.values = (woundsThresholdModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in woundsThresholdModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (woundsThresholdModel._values || []));

woundsOrStrainModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new woundsOrStrainModel(parsed);
    instantiated.__proto__ = woundsOrStrainModel.prototype;
    return instantiated;
});
woundsOrStrainModel.values = (woundsOrStrainModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in woundsOrStrainModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (woundsOrStrainModel._values || []));

skillModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new skillModel(parsed);
    instantiated.__proto__ = skillModel.prototype;
    return instantiated;
});
skillModel.values = (skillModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in skillModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (skillModel._values || []));

skillsModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new skillsModel(parsed);
    instantiated.__proto__ = skillsModel.prototype;
    return instantiated;
});
skillsModel.values = (skillsModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in skillsModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (skillsModel._values || []));

characterModel._values = JSON.parse(`[]`).map(parsed => {
    const instantiated = new characterModel(parsed);
    instantiated.__proto__ = characterModel.prototype;
    return instantiated;
});
characterModel.values = (characterModel._values).reduce((mapped, nextValue) =>{
    if(nextValue.id) {
        if(mapped[nextValue.id]) {
            throw new Error("A duplicate id " + nextValue.id + " was discovered in characterModel");
        }
        mapped[nextValue.id] = nextValue;
    }
    return mapped;
}, (characterModel._values || []));
