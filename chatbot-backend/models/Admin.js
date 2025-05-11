const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" },
  status: { type: String, default: "pending" }, // "pending", "approved", "rejected"
  publisher: { type: String, default: "JD" } // Default publisher to "JD"
});

module.exports = mongoose.model("Admin", adminSchema);