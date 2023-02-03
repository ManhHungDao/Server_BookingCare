const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
  positionId: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  detail: {
    clinicId: {
      type: mongoose.Schema.ObjectId,
      ref: "clinic",
    },
    specialtyId: {
      type: mongoose.Schema.ObjectId,
      ref: "specialty",
    },
    priceId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
