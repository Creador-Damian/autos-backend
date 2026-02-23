const mongoose = require("mongoose");

const AutoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  precio: Number,
  imagen: String
});

module.exports = mongoose.model("Auto", AutoSchema);