const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Auto = require("./models/Auto");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("Conectado a MongoDB 🚀"))
  .catch(err => console.error("Error real:", err));

// Rutas
app.get("/", (req, res) => {
  res.send("Backend de Autos funcionando correctamente 🚀");
});

app.get("/autos", async (req, res) => {
  try {
    const autos = await Auto.find();
    res.json(autos);
  } catch (error) {
    console.error("ERROR DETALLADO:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/autos", async (req, res) => {
  try {
    const nuevoAuto = new Auto(req.body);
    await nuevoAuto.save();
    res.status(201).json(nuevoAuto);
  } catch (error) {
    console.error("ERROR DETALLADO:", error);
    res.status(500).json({ error: error.message });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});