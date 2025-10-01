// src/db/db.js
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI não definido. Configure a variável de ambiente no Vercel."
  );
  process.exit(1); // sai do processo
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectou ao banco MongoDB!");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
    process.exit(1);
  }
}

connectDB();

module.exports = mongoose;
