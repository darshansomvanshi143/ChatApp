// Node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        user[socket.id] = name;
        socket.broadcats.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcats.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcats.emit('left', users[socket.id]);
        delete user[socket.id];
    });
})