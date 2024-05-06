const mongoose = require("mongoose");
const config = require("../app/config/config");

async function main() {
  await mongoose.connect(config.MONGODB_URI);
  console.log(`conectou ao banco!`);
}

main().catch((err) => console.log(err));

module.exports = mongoose;
