import _ from "lodash";
import copyWithPrototype from "../copyWithPrototype";

const modelTranslator = function (modelConfiguration, targetPath, value) {
        if (targetPath === undefined) {
            throw new Error("targetPath must not be null or undefined");
        }
        if (_.isNil(value)) {
            return;
        }
        const pathElementTokens = _.toPath(targetPath);
        const modelDef = pathElementTokens.reduce((currentPosition, nextPathElement) => {
            if (currentPosition === undefined) {
                return undefined;
            }
            if(/^\d+$/.test(nextPathElement)) {
                return currentPosition;
            }
            if(currentPosition.type) {
                var arrayMatcher = /\[(.*)\]/.exec(currentPosition.type);
                if (arrayMatcher) {
                    const itemType = arrayMatcher[1];
                    return modelConfiguration[itemType].prototype.definition[nextPathElement];
                } else {
                    return modelConfiguration[currentPosition.type].prototype.definition[nextPathElement];
                }
            } else if (currentPosition.prototype) {
                return currentPosition.prototype.definition[nextPathElement];
            } else {
                return currentPosition[nextPathElement];
            }
        }, modelConfiguration);
        if(modelDef) {
            const isArrayMatcher = /\[(.*)\]/.exec(modelDef.type);
            const instanceModelType = isArrayMatcher ? isArrayMatcher[1] : modelDef.type;
            if (instanceModelType === "string" || instanceModelType === "number") {
                const arrayTypeButValueNotArray = isArrayMatcher && !_.isArray(value);
                const arrayTypeButArrayValuesWrong = _.isArray(value) && value.reduce((found, next)=>{
                    return found || typeof next != instanceModelType;
                }, false);
                const typeWrong = instanceModelType !== typeof value;
                if (arrayTypeButValueNotArray || arrayTypeButArrayValuesWrong || (typeWrong && !isArrayMatcher)) {
                    throw new Error("Path " + targetPath + " has a defined type of " + modelDef.type + " but a " + typeof value + " was given.");
                }
                return value;
            }

            return lookupOrCreateInstance(modelConfiguration, value, modelDef);
        } else {
            return value;
        }
    }
;

export default modelTranslator;

function lookupOrCreateInstance(modelConfiguration, value, typeDefinition) {
    const valueId = _.isString(value) ? value : _.get(value, "id");
    const instanceType = typeDefinition.type.replace("[", "").replace("]", "");
    const lookupValue = modelConfiguration[instanceType].values.find(v => v.id === valueId);
    if (lookupValue) {
        lookupValue.effects = [...modelConfiguration[instanceType].prototype.effects];
        return _.cloneDeepWith(lookupValue, copyWithPrototype);
    } else {
        const newInstance = new modelConfiguration[instanceType](value);
        modelConfiguration[instanceType].values.push(newInstance);
        modelConfiguration[instanceType].values[newInstance.id] = newInstance;
        newInstance.effects = [...modelConfiguration[instanceType].prototype.effects];
        return newInstance;
    }
}