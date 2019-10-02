import _ from "lodash";


const modelTranslator = function(modelConfiguration, targetPath, value) {
    if (targetPath === undefined) {
        throw new Error("targetPath must not be null or undefined");
    }
    if (value === undefined) {
        return;
    }
    const pathElementTokens = _.toPath(targetPath);
    const modelDef = pathElementTokens.reduce((currentPosition, nextPathElement)=>{
        if(currentPosition === undefined) {
            return undefined;
        }
        if (currentPosition.prototype) {
            return currentPosition.prototype.definition[nextPathElement];
        } else {
            return currentPosition[nextPathElement];
        }
    }, modelConfiguration);
    const isArrayMatcher = /\[(.*)\]/.exec(modelDef.type);
    if (modelDef.type === "string" || modelDef.type === "number") {
        if (modelDef.type !== typeof value){
            throw new Error(`Path ${targetPath} has a defined type of ${modelDef.type} but a ${typeof value} was given.`);
        }
        return value;
    }
    return lookupOrCreateInstance(value, modelDef);

};

export default modelTranslator;

function lookupOrCreateInstance(value, typeDefinition){
    const lookupValue = typeDefinition.prototype.values.find(v => v.id === value);
    if (lookupValue) {
        lookupValue.effects = [...typeDefinition.prototype.effects];
        return lookupValue;
    } else {
        const newInstance = new typeDefinition();
        typeDefinition.prototype.values.push(newInstance);
        newInstance.effects = [...typeDefinition.prototype.effects];
        return newInstance;
    }
}