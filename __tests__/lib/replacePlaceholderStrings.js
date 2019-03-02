const templateReplacter = require('../../lib/replacePlaceholderStrings');
describe("the string replacer", () => {
    it("leaves the string unmodified if it contains no templates", () => {
        const inputString = "This is a string that shouldn't be changed.";
        expect(inputString).toEqual(templateReplacter(inputString, {}));
    });
    it("only replaces template strings with an entry in the replacements definition", () =>{
        const inputString = "This is a string that %should% change, %this% should be unaffected.";
        expect("This is a string that did change, %this% should be unaffected.").toEqual(templateReplacter(inputString, {
            should: "did"
        }));
    });
    it("replaces multiples of a template", () =>{
        const inputString = "This is a string that %should% change, and %should% change here and also %should% here.";
        expect("This is a string that did change, and did change here and also did here.").toEqual(templateReplacter(inputString, {
            should: "did"
        }));
    });
    it("throws an error if no replacements object is used", () => {
        expect(()=>{
            templateReplacter()
        }).toThrow();
    })
});