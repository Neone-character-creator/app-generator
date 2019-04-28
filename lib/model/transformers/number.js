/**
 * Replaces turns string into full configuration object, or return objects.
 * @param input
 * @returns {{type: string}}
 */
module.exports = function(input) {

    if(typeof input === "string") {
        if (input !== "number") {
            throw new Error(`This transformer is for numbers but input is ${input}`);
        }
        return {
            type: "number"
        };
    }
};