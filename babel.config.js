module.exports = {
    "presets": ["@babel/preset-typescript", ["@babel/env" ,{
        "modules": false,
        "targets" :{
            node: 8
        }
    }], "@babel/react"],

    "env": {
        "test": {
            "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }
    }
};