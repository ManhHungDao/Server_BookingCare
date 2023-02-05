const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter product email'],
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // gender: {
  //   type: String,
  //   required: true,
  // },
  // phone: {
  //   type: String,
  //   required: true,
  // },
  // roleId: {
  //   type: String,
  //   required: true,
  // },
  // positionId: {
  //   type: String,
  // },
  // image: {
  //   data: Buffer,
  //   contentType: String,
  //   required: true,
  // },
  // dateOfBirth: {
  //   type: String,
  //   required: true,
  // },
  // detail: {
  //   clinicId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Clinic",
  //   },
  //   specialtyId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Specialty",
  //   },
  //   priceId: {
  //     type: String,
  //     required: true,
  //   },
  //   paymentId: {
  //     type: String,
  //     required: true,
  //   },
  //   introduce: {
  //     type: String,
  //     required: true,
  //   },
  //   note: {
  //     type: String,
  //     required: true,
  //   },
  //   detail: {
  //     type: String,
  //     required: true,
  //   },
  // },
});

//ecrypting password before save
/* userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password against
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//reste password
userSchema.methods.getResetPassword = function () {
  //Generate token
  const restToken = crypto.randomBytes(20).toString("hex");

  //Hash and set to resetpassword
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");

  //set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return restToken;
}; */

module.exports = mongoose.model("User", userSchema);
