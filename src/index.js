const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const app = express();
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyD89rQLSFUnanXZBH-hZPYboEURX-2_6xY",
    authDomain: "websocketchat-e51b2.firebaseapp.com",
    databaseURL: "https://websocketchat-e51b2.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

const database = firebase.database();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs')

// middlewares

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(require('./routes/index'));

app.use(cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24*60*60*1000
}))

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

