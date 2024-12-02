// models/shoeModel.js
const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  imgAddress: { type: String, required: true },
  modelColor: { type: String, required: true },
});
const ShoeModel = mongoose.model('Shoe', shoeSchema); 
module.exports = ShoeModel;
