const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("SUCCESSFUL CONNECTION TO MONGODB");
  } catch (error) {
    console.error("CONNECTION ERROR: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;