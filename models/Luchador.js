'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const luchadorSchema = new Schema({
    id: String,
    nombre: String,
    alias: String,
    division: String
})

const Luchador = mongoose.model('Luchador',luchadorSchema, "luchador");

module.exports = Luchador;