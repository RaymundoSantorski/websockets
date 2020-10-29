const app = require('./app');

// start the server
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
});

