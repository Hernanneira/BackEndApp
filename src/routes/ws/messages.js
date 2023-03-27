const { obtenerMensajes, nuevoMensaje, obtenerEmailMensajes } = require('../../services/servicesMessages');

async function handleSendMessages () {
    try {
      return await obtenerMensajes()
    } catch (error) {
      console.error(error.message)
      return []
    }
}

// async function handleSendEmailMessages (email) {
//   try {
//     return await obtenerEmailMensajes(email)
//   } catch (error) {
//     console.error(error.message)
//     return []
//   }
// }
  // socket.on("email", async (email) => {
  //   await nuevoMensaje(email)
  //   sockets.emit("emailMessages",);
  // });

async function configureSocketMessage(socket, sockets) {
  socket.emit("messages", await handleSendMessages());

  socket.on("messegesNew", async (message) => {
    await nuevoMensaje(message)
    sockets.emit("messages", await handleSendMessages());
  });
}

module.exports = { configureSocketMessage };
