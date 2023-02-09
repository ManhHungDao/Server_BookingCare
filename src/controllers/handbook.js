import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Handbook from "../models/handbook";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const handbook = await Handbook.find();
  res.status(200).json({
    handbook,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const handbook = await Handbook.find();
  res.status(200).json({
    handbook,
    success: true,
  });
});

exports.delete = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required handbook id", 400));
  }

  let handbook = await Handbook.findById(id);

  if (!handbook) {
    return next(new ErrorHandler("Handbook not Found", 404));
  }

  cloudinary.v2.uploader.destroy(handbook.image.public_id);
  cloudinary.v2.uploader.destroy(handbook.logo.public_id);

  await Handbook.remove();
  res.status(200).json({
    message: "Handbook deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const handbook = await Handbook.find(req.params.id);
  if (!handbook) {
    return next(new ErrorHandler("Handbook not Found", 404));
  }
  res.status(200).json({
    handbook,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const handbooks = await Handbook.find();
  res.status(200).json({
    handbooks,
    success: true,
  });
});
