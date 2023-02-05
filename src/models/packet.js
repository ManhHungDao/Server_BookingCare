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
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  specialtyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty",
  },
  priceId: {
    type: String,
    required: true,
  },
  image: {
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
  checkList: {
    type: String,
  },
});

module.exports = mongoose.model("Packet", packetSchema);
