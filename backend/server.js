const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());

const uri = process.env.MONGODB_URI;

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

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
