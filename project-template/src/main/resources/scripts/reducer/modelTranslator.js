import _ from "lodash";


const modelTranslator = function (modelConfiguration, targetPath, value) {
        if (targetPath === undefined) {
            throw new Error("targetPath must not be null or undefined");
        }
        if (value === undefined) {
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
            if (currentPosition.prototype) {
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
                const arrayTypeButArrayValuesWrong = isArrayMatcher && instanceModelType !== typeof value[0];
                const typeWrong = instanceModelType === typeof value;
                if (arrayTypeButValueNotArray || arrayTypeButArrayValuesWrong || typeWrong) {
                    throw new Error("Path " + targetPath + " has a defined type of " + modelDef.type + " but a " + typeof value + " was given.");
                }
                return value;
            }

            return lookupOrCreateInstance(modelConfiguration, _.get(value, "id", value), modelDef);
        } else {
            return value;
        }
    }
;

export default modelTranslator;

function lookupOrCreateInstance(modelConfiguration, value, typeDefinition) {
    const instanceType = typeDefinition.type.replace("[", "").replace("]", "");
    const lookupValue = modelConfiguration[instanceType].values.find(v => v.id === value);
    if (lookupValue) {
        lookupValue.effects = [...modelConfiguration[instanceType].prototype.effects];
        return lookupValue;
    } else {
        const newInstance = new modelConfiguration[instanceType]();
        modelConfiguration[instanceType].values.push(newInstance);
        newInstance.effects = [...modelConfiguration[instanceType].prototype.effects];
        return newInstance;
    }
}