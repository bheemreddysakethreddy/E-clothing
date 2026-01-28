const mongoose = require("mongoose");
async function mongodbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_PATH},eclothing`);
    console.log("connected to database");
  } catch (err) {
    console.log("Connection Failed", err);
  }
}

module.exports = mongodbConnection;
