const app = require('express')();

const port = 9999;

app.use('/src/resources/templates/sheet.html', function(req, res) {
    res.sendFile(__dirname + '/src/resources/templates/sheet.html');
});

app.use('/', function(req, res, next){
    res.sendFile(__dirname + '/demo.html');
});

app.listen(port, ()=>{
    console.log("Demo server listening on " + port);
});