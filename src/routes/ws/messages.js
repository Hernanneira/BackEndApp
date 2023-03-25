const { obtenerMensajes, nuevoMensaje, } = require('../../services/servicesMessages');

async function handleSendMessages () {
    try {
      return await obtenerMensajes()
    } catch (error) {
      console.error(error.message)
      return []
    }
}

async function configureSocketMessage(socket, sockets) {
  socket.emit("messages", await handleSendMessages());

  socket.on("messegesNew", async (message) => {
    await nuevoMensaje(message)
    sockets.emit("messages", await handleSendMessages());
  });

}

module.exports = { configureSocketMessage };
