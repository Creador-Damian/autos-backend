const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Auto = require("./models/Auto");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const app = express();

// =========================
// VALIDACIÓN VARIABLES
// =========================

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI no está definida en Render");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error("❌ ERROR: Cloudinary no está configurado");
}

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
// CONEXIÓN MONGO (MEJORADA)
// =========================

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("✅ Conectado a MongoDB 🚀");
})
.catch(err => {
  console.error("❌ Error conectando a MongoDB:", err.message);
});

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
    console.error("ERROR GET:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 CREAR AUTO
app.post("/autos", upload.single("imagen"), async (req, res) => {
  try {

    const nuevoAuto = new Auto({
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: Number(req.body.anio),
      precio: Number(req.body.precio),
      imagen: req.file ? req.file.path : null
    });

    await nuevoAuto.save();
    res.status(201).json(nuevoAuto);

  } catch (error) {
    console.error("ERROR CREATE:", error.message);
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
    console.error("ERROR DELETE:", error.message);
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
    console.error("ERROR UPDATE:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// =========================
// PUERTO
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});