const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");


console.log("db mongoose productos INICIADO");

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
  productosDAO = mongooseProductos.model(
    "productos",
    require("../schemasModel/productoSchema")
  );

  async getAll() {
    try {
      const content = await this.productosDAO.find({});
      return content;
    } catch (error) {
      return error;
    }
  }

  async save(newArticulo) {
    try {
      const newContent = await this.productosDAO.create(newArticulo);
      return newContent;
    } catch (error) {
      return error;
    }
  }
  
  async obtenerDatoId (id) {
    try {
      const content = await this.productosDAO.find({"_id": id});
      return content;
    } catch (error) {
      return error;
    }
  }
  
  async categoria (categoria) {
    try {
      const content = await this.productosDAO.find({"category": categoria});
      return content;
    } catch (error) {
      return error;
    }
  }

  async update (articulo) {
    try {
      const content = await this.productosDAO.replaceOne({"id_articulo": articulo.id_articulo}, articulo);
      return content;
    } catch (error) {
      return error;
    }
  }

  async delete (id) {
    try {
      const content = await this.productosDAO.deleteOne({"id_articulo": id});
      return content;
    } catch (error) {
      return error;
    }
  }
}

  

const productosDAO = new Pruduct();

module.exports = productosDAO;
