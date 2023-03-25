const { obtenerDatos, crearDato } = require("../../services/servicesProduct");

async function handleSendProducts() {
  try {
    const productos = await obtenerDatos();
    return productos;
  } catch (error) {
    console.error(error.productos);
    return [];
  }
}

async function configureSocketProducts(socket, sockets) {
  socket.emit("productos", await handleSendProducts());

  socket.on("guardarNuevoProducto", async (nuevoProducto) => {
    const newProducto = await crearDato(nuevoProducto);
    console.log(newProducto);
    sockets.emit("productos", await handleSendProducts());
  });
}

module.exports = { configureSocketProducts };
