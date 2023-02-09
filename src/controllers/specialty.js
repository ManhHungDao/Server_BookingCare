import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Specialty from "../models/specialty";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const specialty = await Specialty.find();
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const specialty = await Specialty.find();
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.delete = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required specialty id", 400));
  }

  let specialty = await Specialty.findById(id);

  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }

  cloudinary.v2.uploader.destroy(specialty.image.public_id);

  await Specialty.remove();
  res.status(200).json({
    message: "Specialty deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const specialty = await Specialty.find(req.params.id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const specialties = await Specialty.find();
  res.status(200).json({
    specialties,
    success: true,
  });
});
