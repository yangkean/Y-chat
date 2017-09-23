module.exports = function(io) {
  return (socket) => {
    console.log(`${io.engine.clientsCount} sockets connected...`);
    
    socket.on('chat message', (msg) => {
      console.log(`${socket.username}: ${msg}`);
      
      socket.broadcast.emit('chat message', {
        username: socket.username,
        msg: msg
      });
    });

    socket.on('user login', (user) => {
      socket.username = user;

      console.log(`${socket.username} has logged in`);
    });

    socket.on('disconnect', () => {
      console.log(`disconnected: ${socket.id}`);
    });
  };
};