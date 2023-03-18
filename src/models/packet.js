// title: DataTypes.STRING,
// contentMarkdown: DataTypes.TEXT("long"),
// contentHTML: DataTypes.TEXT("long"),
// price: DataTypes.STRING,
// clinicId: DataTypes.STRING,
// description:DataTypes.TEXT("long"),
// image: DataTypes.TEXT("long"),
// typepacket:DataTypes.STRING,

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const packetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clinic: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  specialty: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
    },
    name: {
      type: String,
    },
  },
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
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Packet", packetSchema);
