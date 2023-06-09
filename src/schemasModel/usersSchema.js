const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersScheme = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: Number, required: true },
    foto: { type: String, required: true },
})

module.exports = usersScheme