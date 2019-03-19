const path = require("path");

module.exports = {
    "mode": "development",
    "entry": "./src/main/resources/scripts/app.js",
    "output" : {
        path: path.resolve(__dirname, "src/main/resources/scripts/"),
        filename: "app.bundle.js"
    },
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/env",
                            "@babel/react"
                        ]
                    }
                }
            }
        ]
    },
}