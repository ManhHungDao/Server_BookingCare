const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const allcodeSchema = new Schema({
  keyMap: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  valueEN: {
    type: String,
    required: true,
  },
  valueVI: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Allcode", allcodeSchema);
