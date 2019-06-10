const fs = require("fs-extra");
const path = require("path");

module.exports = (()=>{
    return fs.readdirSync(path.resolve(__dirname, "..", "code-templates")).reduce((mapped, file)=>{
        mapped[file.substring(0, file.indexOf("-template"))] = fs.readFileSync(require("path").resolve(__dirname, "..", "code-templates", file), "utf-8");
        return mapped;
    }, {});
})();