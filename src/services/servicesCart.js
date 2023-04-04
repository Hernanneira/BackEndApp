const cartProductosDAO = require("../DAO/cartProductosDAO");

async function obtenerCart(user) {
  return await cartProductosDAO.getCart(user);
}

async function crearCart(cartUser) {
  const cart = await obtenerCart(cartUser.email);
  if (cart.length !== 0) {
    const content = await cartProductosDAO.update(cartUser.email, cartUser.cart);
    return content;
  } else {
    const content = await cartProductosDAO.createCart(cartUser);
    return content;
  }
}

async function updateCart(cartUser) {
  const cart = await obtenerCart(cartUser.email);
  if (cart.length !== 0) {
    const content = await cartProductosDAO.update(cartUser.email, cartUser.cart);
    return content;
  }
}

async function enviarCart(cartProductsUser) {
  if (cartProductsUser.length !== 0) {
    const cartProductsAA = cartProductsUser.find((element) => element.cart);
    const cartProducts = cartProductsAA.cart;
    return cartProducts;
  }
}

async function deleteCart(user) {
  return await cartProductosDAO.deleteAll(user);
}


module.exports = {
  obtenerCart,
  crearCart,
  enviarCart,
  deleteCart,
  updateCart
};
