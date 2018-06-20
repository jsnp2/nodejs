/**
 * FAZ CONEXÃO COM A BASE DE DADOS
 */
const mongoose = require('mongoose');

/**
 * @description useMongoClient Forma de conectar com o Mongo 
 * @argument useMongoClient
 * 
 */
mongoose.connect('mongodb://localhost/noderest');
mongoose.Promise = global.Promise;

module.exports = mongoose;