import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Handbook from "../models/handbook";
import _ from "lodash";

exports.create = catchAsyncErrors(async (req, res, next) => {
  let { name, note, image, detail, clinic, specialty } = req.body;
  if (_.isEmpty(clinic) === true)
    clinic = {
      id: null,
      name: null,
    };
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!note) {
    return next(new ErrorHandler("Required note", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }
  if (!specialty) {
    return next(new ErrorHandler("Required specialty", 400));
  }
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "handbook",
  });
  const handbook = await Handbook.create({
    name,
    note,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    detail,
    specialty,
    clinic: clinic,
  });
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
