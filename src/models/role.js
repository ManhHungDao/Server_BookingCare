const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    required: true,
  },
  permissions: [{ type: String }],
});

module.exports = mongoose.model("Role", roleSchema);
