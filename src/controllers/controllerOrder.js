const dotenv = require("dotenv");
dotenv.config();
const logger = require("../utils/log4js");
const {enviarOrder, getUserOrder} = require("../services/servicesOrder");

const controllerCreateOrder = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  const cartOrder = {
    cart: req.body.cart,
    email: req.session.token.userName.email,
    date: new Date().toLocaleString(),
    address: req.body.address
  };

  const newOrder = {
    item: cartOrder,    
    nOrder: 1,
    date: new Date().toLocaleString(),
    estado: "generado",
    email : req.session.token.userName.email
  };


const sendOrder = await enviarOrder(newOrder, req.session.token.userName.email);

sendOrder
    ? res.status(200).json({ succes: `la Orden de compra se creo con exito ${sendOrder}` })
    : res.status(500).json({ error: "Hubo un error en el servidor" });
};

const controllerindexOrder = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );

const orderMade  = await getUserOrder(req.session.token.userName.email)
res.render('orden.ejs', {orderMade})
};



module.exports = {
    controllerCreateOrder,
    controllerindexOrder
  };
