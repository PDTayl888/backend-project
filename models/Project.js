const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
}, { timestamps: true });


const User = mongoose.model("Product", userSchema);

module.exports = User;
