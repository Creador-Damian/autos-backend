const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Auto = require("./models/Auto");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const app = express();

// =========================
// CONFIG CLOUDINARY
// =========================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "autos",
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const upload = multer({ storage });

// =========================
// MIDDLEWARES
// =========================

app.use(cors());
app.use(express.json());

// =========================
// CONEXIÓN MONGO
// =========================

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("Conectado a MongoDB 🚀"))
  .catch(err => console.error("Error real:", err));

// =========================
// RUTAS
// =========================

app.get("/", (req, res) => {
  res.send("Backend de Autos funcionando correctamente 🚀");
});

// 🔹 OBTENER AUTOS
app.get("/autos", async (req, res) => {
  try {
    const autos = await Auto.find();
    res.json(autos);
  } catch (error) {
    console.error("ERROR GET:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 CREAR AUTO CON IMAGEN
app.post("/autos", upload.single("imagen"), async (req, res) => {
  try {
    const nuevoAuto = new Auto({
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: req.body.anio,
      precio: req.body.precio,
      imagen: req.file.path // URL de Cloudinary
    });

    await nuevoAuto.save();
    res.status(201).json(nuevoAuto);

  } catch (error) {
    console.error("ERROR CREATE:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 ELIMINAR
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

// 🔹 EDITAR
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

// =========================
// PUERTO
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});