const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    createIndexes: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be 4 digits long"],
  },
  active: {
    type: Boolean,
    default: true,
  },

  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    required: true,
    default: "user",
  },

  createdate: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
