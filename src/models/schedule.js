// currentNummber: DataTypes.INTEGER,
// maxNumber: DataTypes.INTEGER,
// date: DataTypes.STRING,
// timeType: DataTypes.STRING,
// doctorId: DataTypes.INTEGER,
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
  doctor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
  },
  packet: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packet",
    },
    name: {
      type: String,
    },
  },
  detail: {
    price: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Allcode",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    payment: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Allcode",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    note: {
      type: String,
      required: true,
    },
  },
  schedule: [
    {
      timeType: {
        type: String,
        required: true,
      },
      user: {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
      status: {
        type: Number,
        required: true,
        default: 0,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
