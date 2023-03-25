const dotenv = require("dotenv");
dotenv.config();
const logger = require("../utils/log4js");
const {
  obtenerCart,
  crearCart,
  enviarCart,
} = require("../services/servicesCart");

const controllerCreateCart = async (req, res, next) => {
  logger.info(
    `Se accedio a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  const cartProductos = req.body;
  const cartUser = {
    cart: cartProductos,
    user: req.session.passport.user,
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
    const cartProductsUser = await obtenerCart(req.session.passport.user);
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
    res.render("cart.ejs", { user: req.session.passport.user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Hubo un error en el servidor" });
  }
};

module.exports = {
  controllerCreateCart,
  controllerSendCart,
  controllerGetCart,
};
