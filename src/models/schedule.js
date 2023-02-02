// currentNummber: DataTypes.INTEGER,
// maxNumber: DataTypes.INTEGER,
// date: DataTypes.STRING,
// timeType: DataTypes.STRING,
// doctorId: DataTypes.INTEGER,
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  note: {
    type: String,
    required: true,
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
      name: {
        type: String,
        required: true,
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
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
