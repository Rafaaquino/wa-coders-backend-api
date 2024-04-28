const mongoose = require("mongoose");
const config = require("../config/config");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/wa-coders");
  console.log("Conectou ao banco!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
