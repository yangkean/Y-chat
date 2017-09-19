module.exports = function(io) {
  return (socket) => {
    console.log(`${io.engine.clientsCount} sockets connected...`);
    
    socket.on('chat message', (msg) => {
      console.log(`${socket.id}: ${msg}`);
      
      io.emit('chat message', {
        username: socket.username,
        msg: msg
      });
    });

    socket.on('disconnect', () => {
      console.log(`disconnected: ${socket.id}`);
    });
  };
};