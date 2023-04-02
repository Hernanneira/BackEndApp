const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

console.log("db mongoose ordenes INICIADO");

const mongooseProductos = mongoose.createConnection(
  `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }
);
console.log("db mongoose ordenes conectada");

class Order {
  orderDAO = mongooseProductos.model(
    "ordenes",
    require("../schemasModel/orderSchema")
  );

  async createOrder(order) {
    try {
      const content = await this.orderDAO.create(order);
      return content;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async countDocument() {
    try {
      const content = await this.orderDAO.estimatedDocumentCount();
      return content;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getOrder(email) {
    try {
      const content = await this.orderDAO.find({email: email});
      return content;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}



const ordenDAO = new Order();

module.exports = ordenDAO;
