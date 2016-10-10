var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');

/*var middleware = require("./middleware.js");
app.use(middleware.logger);*/

app.use(bodyParser.json());

var todos = [];
var todoNextId = 1;

app.get('/todos',function(request,response){
	response.json(todos);
});

app.post('/todos',function(request,response){
	var body = _.pick(request.body,'description','completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		response.status(400).send();
	}
	else{
		body.description = body.description.trim();
		body.id = todoNextId++;
		todos.push(body);
		response.json(todos);
	}
});

app.get('/todo/:id',function(request,response){
	var todoId = parseInt(request.params.id);
	var matchedTodo = _.findWhere(todos,{id : todoId});

	matchedTodo ? response.json(matchedTodo) : response.status(404).send();
});

app.delete('/todo/:id',function(request,response){
	var todoId = parseInt(request.params.id);
	var matchedTodo = _.findWhere(todos,{id : todoId});

	if(!matchedTodo){
		response.status(404).json({"error":"no error with id"});
	}
	else{
		todos = _.without(todos,matchedTodo);
		response.json(matchedTodo);
	}
});

app.get('/about', function(request, response){
	response.send('about us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT,function(){
	console.log("Server started at port : " + PORT);
});
