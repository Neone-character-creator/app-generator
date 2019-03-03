var rreaddir = require('recursive-readdir');
module.exports = function (projectDirectory) {
    return rreaddir(projectDirectory).then((paths) => {
        return paths;
    });
};