/* clinicId: DataTypes.INTEGER,
name: DataTypes.STRING,
detailMarkdown: DataTypes.TEXT,
detailHTML: DataTypes.TEXT,
image: DataTypes.TEXT, */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const specialtySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  keyMap: {
    type: String,
    required: true,
  },
  clinic: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
    },
    name: {
      type: String,
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
  detail: {
    type: String,
  },
  popular: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Specialty", specialtySchema);
