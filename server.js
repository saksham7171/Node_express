var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var middleware = require("./middleware.js");
/*app.get('/', function(request, response){
	response.send('hello express');
});*/



app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(request, response){
	response.send('about us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT,function(){
	console.log("Server started at port : "+PORT);
});
