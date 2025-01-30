const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String }, // İstifadəçi profil şəkli üçün
});

const User = mongoose.model("User", userSchema);
module.exports = User;

