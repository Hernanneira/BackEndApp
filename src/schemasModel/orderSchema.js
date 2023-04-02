const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderScheme = new Schema({
    item: { type: Object, required: true },    
    nOrder: { type: Number, required: true },
    date: { type: String, required: true },
    estado: { type: String, required: true },
    email : { type: String, required: true }
})

module.exports = orderScheme