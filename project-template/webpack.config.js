const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const bodyParser = require("body-parser");
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
            app.use(bodyParser.json());
            app.use("/templates/sheet.html", function(req, res) {
                const resourcePath = path.resolve(__dirname + "/src/main/resources" + req.baseUrl);
                res.sendFile(resourcePath);
            });
            app.use(/\/scripts\/.*/, function(req, res) {
                const resourcePath = path.resolve(__dirname + ["", "src", "main", "resources"].join(path.sep) + req.baseUrl);
                res.sendFile(resourcePath);
            });
            app.use("/save", function(req, res){
                var data = JSON.stringify(req.body);
                fs.writeFile("character.json", data, {}, function(err){
                    if(err) {
                        console.error(err);
                    } else {
                        console.log("Exported");
                    }

                    res.send();
                });

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
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":"'dev'",
            "process.env.HAS_PDF": fs.existsSync(path.resolve("src", "main", "resources", "sheet.pdf"))
        })
    ]
};