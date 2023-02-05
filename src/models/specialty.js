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
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Specialty", specialtySchema);
