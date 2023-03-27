const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensajesScheme = new Schema({
    email: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    date: { 
        type: String, 
        required: true },
    text: {
        type: String,
        required: true
    }
})

module.exports = MensajesScheme;