const productosDAO = require("../DAO/productsDAO");

async function obtenerDatos() {
  return await productosDAO.getAll();
}

async function crearDato(newArticulo) {
  const content = await obtenerDatos();
  let newId;
  if (content.length == 0) {
    newId = 1;
  } else {
    newId = content.length + 1;
    console.log("newID", newId);
  }
  (newArticulo.id_articulo = newId), (newArticulo.quantity = 0);
  const newContent = await productosDAO.save(newArticulo);
  return newContent;
}

module.exports = {
  obtenerDatos,
  crearDato,
};
