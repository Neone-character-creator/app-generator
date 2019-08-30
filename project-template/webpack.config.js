const path = require("path");

function resolvePluginResource(req, res) {

}

module.exports = {
    "mode": "development",
    "entry": "./src/main/resources/scripts/app.js",
    "output" : {
        path: path.resolve(__dirname, "src/main/resources/scripts/"),
        filename: "app.bundle.js",
        publicPath: "/src/main/resources"
    },
    devServer:{
        before: function(app, server){
            app.use("/templates/sheet.html", function(req, res) {
                const resourcePath = path.resolve(__dirname + "/src/main/resources" + req.baseUrl);
                res.sendFile(resourcePath);
            });
            app.use(/\/pluginresource\/.*/, function(req, res) {
                console.log(req.baseUrl);
                var split = req.baseUrl.split("/");
                console.log(split);
                var adjustedPath = "/" + split.slice(2).join("/");
                console.log(adjustedPath);
                const resourcePath = path.resolve(__dirname + ["", "src", "main", "resources"].join(path.sep) + adjustedPath);
                res.sendFile(resourcePath);
            });
        },
        contentBase: __dirname,
        port: 9999,
        hot: true,
        index: "demo.html",
        historyApiFallback: {
            index: "demo.html",
        },
        writeToDisk: true
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
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.json$/i,
                use: ['json-loader']
            }
        ]
    },
    "node" : {
        module: "empty",
        net: "empty",
        fs: "empty"
    }
}