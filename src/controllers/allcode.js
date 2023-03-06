import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Allcode from "../models/allcode";

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const allcodes = await Allcode.find();
  res.status(200).json({
    allcodes,
    success: true,
  });
});

exports.getByType = catchAsyncErrors(async (req, res, next) => {
  const type = req.query.type;
  if (!type) {
    return next(new ErrorHandler("Required allcode type", 400));
  }
  const allcodes = await Allcode.find({ type: type });
  res.status(200).json({
    allcodes,
    type,
    count: allcodes.length,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required allcode id", 400));
  }
  let allcode = await Allcode.findById(id);
  if (!allcode) {
    return next(new ErrorHandler("Allcode not Found", 404));
  }
  allcode = await Allcode.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    allcode,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required allcode id", 400));
  }
  let allcode = await Allcode.findById(id);
  if (!allcode) {
    return next(new ErrorHandler("Allcode not Found", 404));
  }
  await Allcode.deleteOne({ _id: id });
  res.status(200).json({
    message: "Allcode deleted successfully",
    success: true,
  });
});

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { keyMap, type, valueEN, valueVI } = req.body;
  const createAllcode = await Allcode.create({
    keyMap,
    type,
    valueEN,
    valueVI,
  });
  res.status(200).json({
    createAllcode,
    success: true,
  });
});
