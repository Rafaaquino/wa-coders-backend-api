const mongoose = require("mongoose");
const config = require("../app/config/config");

async function main() {
  await mongoose.connect(
    "mongodb+srv://wacoders:gDU7Jp7hNPZmYGyw@wacodersdb.et0tbe3.mongodb.net/?retryWrites=true&w=majority&appName=wacodersdb"
  );
  console.log(`conectou ao banco!`);
}

main().catch((err) => console.log(err));

module.exports = mongoose;
