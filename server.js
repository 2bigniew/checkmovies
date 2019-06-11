const app = require('./app');

app.set( 'port', process.env.PORT || 8080 );

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on ${server.address().port}`);
});

// Chat **************************************************************
const io = require('socket.io')(server);
app.set('socket_io_movie_chat', io);

io.on('connection', function(socket) {
    socket.on('chat-start', (data) => io.sockets.emit('chat-start', data));
    socket.on('typing', (data) => socket.broadcast.emit('typing', data));
});

module.exports = server;