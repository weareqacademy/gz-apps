var express = require('express');
var path = require("path");

const port = process.env.PORT || 3000;


var app = express();

app.use(express.static(__dirname + '/build'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, function () {
  console.log('Getgeeks disponível na porta ' + port);
});