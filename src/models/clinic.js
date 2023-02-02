const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    province: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  logo: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  introduce: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Clinic", clinicSchema);
