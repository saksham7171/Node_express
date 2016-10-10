var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

/*var middleware = require("./middleware.js");
app.use(middleware.logger);*/

var todos=[{
	id:1,
	description: 'Todo 1',
	completed:false
}, {
	id:2,
	description: 'Todo 2',
	completed:false
}, {
	id:3,
	description: 'Todo 3',
	completed:true
}];

app.get('/todos',function(request,response){
	response.json(todos);
});

app.get('/todo/:id',function(request,response){
	var todoId = parseInt(request.params.id);
	var matchedTodo;

	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo=todo;
		}
	});

	matchedTodo ? response.json(matchedTodo) : response.status(404).send();
});

app.get('/about', function(request, response){
	response.send('about us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT,function(){
	console.log("Server started at port : " + PORT);
});
