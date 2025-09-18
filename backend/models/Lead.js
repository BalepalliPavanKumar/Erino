const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String },
  company: String,
  city: String,
  status: { type: String, enum: ["new", "contacted", "qualified"], default: "new" },
  source: { type: String, enum: ["web", "referral", "ads"], default: "web" },
  score: Number,
  lead_value: Number,
  is_qualified: { type: Boolean, default: false },
  last_activity_at: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
