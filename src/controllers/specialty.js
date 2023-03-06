import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Specialty from "../models/specialty";
import Clinic from "../models/clinic"

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { popular, name, clinic, image, detail, keyMap } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!keyMap) {
    return next(new ErrorHandler("Required key map", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "specialty",
    width: 250,
    crop: "scale",
  });
  const specialty = await Specialty.create({
    name,
    keyMap,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    clinic,
    detail: detail ? detail : null,
    popular,
  });

  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required specialty id", 400));
  }
  let specialty = await Specialty.findById(id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  await cloudinary.v2.uploader.destroy(specialty.image.public_id);
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "specialty",
  });
  req.body.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required specialty id", 400));
  }
  let specialty = await Specialty.findById(id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  cloudinary.v2.uploader.destroy(specialty.image.public_id);
  await Specialty.deleteOne({ _id: id });
  res.status(200).json({
    message: "Specialty deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const specialty = await Specialty.findById(req.params.id);
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
