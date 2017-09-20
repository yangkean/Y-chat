module.exports = function(io) {
  return (socket) => {
    console.log(`${io.engine.clientsCount} sockets connected...`);
    
    socket.on('chat message', (msg) => {
      console.log(`${socket.id}: ${msg}`);
      
      socket.broadcast.emit('chat message', {
        username: socket.username,
        msg: msg
      });
    });

    socket.on('user login', (user) => {
      socket.username = user;
    });

    socket.on('disconnect', () => {
      console.log(`disconnected: ${socket.id}`);
    });
  };
};