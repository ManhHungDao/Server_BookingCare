const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const allcodeSchema = new Schema({
  keyMap: {
    type: String,
  },
  type: {
    type: String,
  },
  valueEN: {
    type: String,
  },
  valueVI: {
    type: String,
  },
});

module.exports = mongoose.model("Allcode", allcodeSchema);
