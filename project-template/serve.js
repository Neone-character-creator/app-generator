const app = require('express')();
const path = require("path");
const port = 9999;


app.use('/demo', function(req, res, next){
    res.sendFile(__dirname + '/demo.html');
});

app.use('/*', function(req, res) {
    const resourcePath = path.resolve(__dirname + "/src/main/resources" + req.baseUrl);
    res.sendFile(resourcePath);
});

app.listen(port, ()=>{
    console.log("Demo server listening on " + port);
});