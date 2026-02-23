const Auto = require("./models/Auto");
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());

const uri = process.env.MONGO_URI;

console.log("URI usada:", uri);

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado sin SRV 🚀");
  } catch (error) {
    console.error("Error real:", error);
  }
}

connectDB();
app.get("/", (req, res) => {
  res.send("Backend de Autos funcionando correctamente 🚀");
});

  app.get("/autos", async (req, res) => {
  try {
    const autos = await Auto.find();
    res.json(autos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener autos" });
  }
});
app.use(express.json());

app.post("/autos", async (req, res) => {
  try {
    const nuevoAuto = new Auto(req.body);
    await nuevoAuto.save();
    res.status(201).json(nuevoAuto);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar auto" });
  }
});
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
