const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const handbookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialtyId: {
    type: mongoose.Schema.ObjectId,
    ref: "Specialty",
  },
  note: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
});

module.exports = mongoose.model("Handbook", handbookSchema);
