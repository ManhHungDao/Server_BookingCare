import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Allcode from "../models/allcode";
import Specialty from "../models/specialty";
import Clinic from "../models/clinic";

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
  let idAllcode = allcode._id;
  if (!allcode) {
    return next(new ErrorHandler("Allcode not Found", 404));
  }
  allcode = await Allcode.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    Specialty,
  });
  await Specialty.updateMany(
    { key: idAllcode },
    { $set: { name: req.body.valueVI } }
  );
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
  const existed = await Specialty.findById(id);

  if (existed) {
    return next(new ErrorHandler("Existed feild in other model", 500));
  }
  await Allcode.deleteOne({ _id: id });
  res.status(200).json({
    message: "Allcode deleted successfully",
    success: true,
  });
});

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { type, valueEN, valueVI } = req.body;
  if (!type) {
    return next(new ErrorHandler("Required type", 400));
  }
  if (!valueEN || !valueVI) {
    return next(new ErrorHandler("Required value name", 400));
  }
  const createAllcode = await Allcode.create({
    type,
    valueEN,
    valueVI,
  });
  res.status(200).json({
    createAllcode,
    success: true,
  });
});
