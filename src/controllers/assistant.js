import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Allcode from "../models/allcode";
import Specialty from "../models/specialty";
import Schedule from "../models/schedule";
import Assistant from "../models/assistant";
import _ from "lodash";
import cloudinary from "cloudinary";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    image,
    password,
    gender,
    phone,
    dateOfBirth,
    address,
    doctor,
  } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Required email", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Required password", 400));
  }
  if (!gender) {
    return next(new ErrorHandler("Required gender", 400));
  }
  if (!phone) {
    return next(new ErrorHandler("Required phone", 400));
  }
  if (!dateOfBirth) {
    return next(new ErrorHandler("Required day of birth", 400));
  }
  if (!address) {
    return next(new ErrorHandler("Required address", 400));
  }
  if (!doctor) {
    return next(new ErrorHandler("Required doctor", 400));
  }

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "assistant",
    width: 150,
  });
  const createAssistant = await Assistant.create({
    email,
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    password,
    gender,
    phone,
    dateOfBirth,
    address,
    doctor,
    roleId: "R4",
  });
  res.status(200).json({
    createAssistant,
    success: true,
  });
});
