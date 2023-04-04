const orderDAO = require("../DAO/orderDAO");
const userDAO = require("../DAO/usersDAO");
const sendNewBuyEmail = require("../utils/newBuyEmail");
const sendNewbuySMS = require("../utils/newBuySMS");
const sendNewbuyWhatsApp = require("../utils/newBuyWhatsApp");

  async function enviarOrder(newOrder, email) {
    if (newOrder.length !== 0) {
        const findUser = await userDAO.getEmail(email)
        newOrder.nOrder = await orderDAO.countDocument()
        const content = await orderDAO.createOrder(newOrder);
        const contentOrderCart = content.item.cart
        const user = findUser.find((element) => element);
        sendNewBuyEmail(user,contentOrderCart)
        sendNewbuyWhatsApp(user,contentOrderCart)
        sendNewbuySMS(user,contentOrderCart)
        return contentOrderCart;
      }
  }
  async function getUserOrder(email) {
    const order = await orderDAO.getOrder(email);
    return order
  }


module.exports = {
    enviarOrder,
    getUserOrder
  };
  