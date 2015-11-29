var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat:message', function(data){
		socket.join(data.room);
		io.to(data.room).emit('chat:message', data.msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


http.listen(3000, function(){

	console.log('Example app listening');
});