import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken";

import cloudinary from "cloudinary";
import Packet from "../models/packet";
import moment from "moment";
import Patient from "../models/patient";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, gender, phone, dateOfBirth, address } =
    req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Required email", 400));
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

  const patient = await Patient.create({
    email,
    name,
    password,
    gender,
    phone,
    dateOfBirth,
    address,
  });

  res.status(200).json({
    patient,
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("Required id", 400));
  }

  const patient = await Patient.findById(id).select("-password");
  if (!patient) {
    return next(new ErrorHandler("Patient not Found", 404));
  }

  res.status(200).json({
    patient,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("Required id", 400));
  }

  let patient = await Patient.findById(id);
  if (!patient) {
    return next(new ErrorHandler("Patient not Found", 404));
  }

  patient = await Patient.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    patient,
    success: true,
  });
});
