// src/db/db.js
const mongoose = require("mongoose");
const config = require("../app/config/config");

if (!config.MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI não definido. Configure a variável de ambiente no Vercel."
  );
  process.exit(1); // sai do processo para não continuar com URI indefinida
}

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://wacoders:gDU7Jp7hNPZmYGyw@wacodersdb.et0tbe3.mongodb.net/?retryWrites=true&w=majority&appName=wacodersdb"
    );
    console.log("✅ Conectou ao banco MongoDB!");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
    process.exit(1); // encerra a aplicação se não conseguir conectar
  }
}

connectDB();

module.exports = mongoose;
