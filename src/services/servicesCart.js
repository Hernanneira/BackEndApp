const cartProductosDAO = require("../DAO/cartProductosDAO");
const sendNewBuyEmail = require("../utils/newBuyEmail");
const sendNewbuySMS = require("../utils/newBuySMS");
const sendNewbuyWhatsApp = require("../utils/newBuyWhatsApp");

async function obtenerCart(user) {
  return await cartProductosDAO.getCart(user);
}

async function crearCart(cartUser) {
  const cart = await obtenerCart(cartUser.user);
  console.log(cart);
  if (cart.length !== 0) {
    const content = await cartProductosDAO.update(cartUser.user, cartUser.cart);
    return content;
  } else {
    const content = await cartProductosDAO.createCart(cartUser);
    return content;
  }
}

async function enviarCart(cartProductsUser) {
  if (cartProductsUser.length !== 0) {
    const cartProductsAA = cartProductsUser.find((element) => element.cart);
    const cartProducts = cartProductsAA.cart;
    console.log("cartPr", cartProducts);
    console.log("inicio notificaciones");
    // sendNewBuyEmail(user,cartProducts)
    // console.log('notificaciones EMAIL ADMIN ok')
    // sendNewbuyWhatsApp(user,cartProducts)
    // console.log('notificaciones WHATSAPP ADMIN ok')
    // sendNewbuySMS(user,cartProducts)
    // console.log('notificaciones SMS USER whats ok')
    return cartProducts;
  }
}

module.exports = {
  obtenerCart,
  crearCart,
  enviarCart,
};
