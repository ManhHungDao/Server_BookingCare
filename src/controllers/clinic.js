import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Clinic from "../models/clinic";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const clinic = await Clinic.find();
  res.status(200).json({
    clinic,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const clinic = await Clinic.find();
  res.status(200).json({
    clinic,
    success: true,
  });
});

exports.delete = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required clinic id", 400));
  }

  let clinic = await Clinic.findById(id);

  if (!clinic) {
    return next(new ErrorHandler("Clinic not Found", 404));
  }

  cloudinary.v2.uploader.destroy(clinic.image.public_id);
  cloudinary.v2.uploader.destroy(clinic.logo.public_id);

  await Clinic.remove();
  res.status(200).json({
    message: "Clinic deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const clinic = await Clinic.find(req.params.id);
  if (!clinic) {
    return next(new ErrorHandler("Clinic not Found", 404));
  }
  res.status(200).json({
    clinic,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const clinics = await Clinic.find();
  res.status(200).json({
    clinics,
    success: true,
  });
});
