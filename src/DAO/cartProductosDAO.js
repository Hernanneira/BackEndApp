const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

console.log("db mongoose Cartproductos INICIADO");

const mongooseProductos = mongoose.createConnection(
  `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }
);
console.log("db mongoose productos conectada");

class Pruduct {
  cartProductosDAO = mongooseProductos.model(
    "cartProductos",
    require("../schemasModel/cartSchema")
  );

  async createCart(cartUser) {
    try {
      const content = await this.cartProductosDAO.create(cartUser);
      return content;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getCart(email) {
    try {
      const content = await this.cartProductosDAO.find({ email: email });
      if (content.cart == []) {
        return [];
      } else {
        return content;
      }
    } catch (error) {
      return error;
    }
  }

  async update(email, cart) {
    try {
      await this.cartProductosDAO.updateOne(
        { email: email },
        { $set: { cart: cart } }
      );
      return this.getCart(email);
    } catch (error) {
      return error;
    }
  }

  async deleteAll(email) {
    try {
      await this.cartProductosDAO.deleteOne({ email: email });
      return [];
    } catch (error) {
      return "no pudo eliminarse";
    }
  }
}

const cartProductosDAO = new Pruduct();

module.exports = cartProductosDAO;
