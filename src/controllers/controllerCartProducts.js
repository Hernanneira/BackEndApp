const dotenv = require("dotenv");
dotenv.config();
const logger = require("../utils/log4js");
const {
  obtenerCart,
  crearCart,
  enviarCart,
  deleteCart,
  updateCart
} = require("../services/servicesCart");
const UsersDAO = require('../DAO/usersDAO')

const controllerCreateCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  const cartProductos = req.body;
  const cartUser = {
    cart: cartProductos,
    email: req.session.token.userName.email,
    date: new Date().toLocaleString(),
    address: await UsersDAO.getAddress(req.session.token.userName.email)
  };
  const cart = await crearCart(cartUser);

  cart
    ? res.status(200).json({ succes: `El carrito se creo con exito ${cart}` })
    : res.status(500).json({ error: "Hubo un error en el servidor" });
};

const controllerSendCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  try {
    const cartProductsUser = await obtenerCart(req.session.token.userName.email);
    console.log(cartProductsUser);
    const sendedCart = await enviarCart(cartProductsUser);
    if (sendedCart.length !== 0) {
      res
        .status(200)
        .json({ succes: `El carrito se envió con exito ${sendedCart}` });
    }
    console.log("Finalizado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};

const controllerGetCart = async (req, res, next) => {
  try {
    logger.info(
      `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
    );
    res.render("cart.ejs", { user: req.session.token.userName.username, direccion : await UsersDAO.getAddress(req.session.token.userName.email)});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};

const controllerGetAPICart = async (req, res, next) => {
  try {
    logger.info(
      `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
    );
    const cartProductsUser = await obtenerCart(req.session.token.userName.email);
    if (cartProductsUser) {
      const onlyCart = cartProductsUser.find(Element => Element.cart)
      if(onlyCart){
        res.json(onlyCart.cart)
      }else{
        res.json([])
      }
    }else{
      res.json([])
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};
const controllerDeleteAPICart = async (req, res, next) => {
  try {
    logger.info(
      `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
    );
    const cartProductsUser = await deleteCart(req.session.token.userName.email);
    res.json([])
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};
const controllerUpdateCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  const cartProductos = req.body;
  const cartUser = {
    cart: cartProductos,
    email: req.session.token.userName.email,
  };
  const cart = await updateCart(cartUser);

  cart
    ? res.status(200).json({ succes: `El carrito se creo con exito ${cart}` })
    : res.status(500).json({ error: "Hubo un error en el servidor" });
};


module.exports = {
  controllerCreateCart,
  controllerSendCart,
  controllerGetCart,
  controllerGetAPICart,
  controllerDeleteAPICart,
  controllerUpdateCart
};
