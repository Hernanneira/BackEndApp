const { connect } = require("mongoose");
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

async function filtrarId(id) {
  const content = await productosDAO.obtenerDatoId(parseInt(id));
  if(content.length !== 0) {
    return content
  }else {
    return []
  }
}

async function filtrarCategoria(categoria) {
  const content = await productosDAO.categoria(categoria);
  if(content.length !== 0) {
    return content
  }else {
    return []
  }
}

async function updateDato(articulo) {
console.log(articulo)
  return await productosDAO.update(articulo);
}

async function deleteDato(articulo) {
  return await productosDAO.delete(articulo);
}

module.exports = {
  obtenerDatos,
  crearDato,
  filtrarCategoria,
  updateDato,
  deleteDato,
  filtrarId
};
