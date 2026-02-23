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
app.delete("/autos/:id", async (req, res) => {
  try {
    const autoEliminado = await Auto.findByIdAndDelete(req.params.id);

    if (!autoEliminado) {
      return res.status(404).json({ error: "Auto no encontrado" });
    }

    res.json({ mensaje: "Auto eliminado correctamente 🚗" });
  } catch (error) {
    console.error("ERROR DELETE:", error);
    res.status(500).json({ error: error.message });
  }
});
app.put("/autos/:id", async (req, res) => {
  try {
    const autoActualizado = await Auto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!autoActualizado) {
      return res.status(404).json({ error: "Auto no encontrado" });
    }

    res.json(autoActualizado);
  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ error: error.message });
  }
});
// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});