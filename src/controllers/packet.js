import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Packet from "../models/packet";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const packet = await Packet.find();
  res.status(200).json({
    packet,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const packet = await Packet.find();
  res.status(200).json({
    packet,
    success: true,
  });
});

exports.delete = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required packet id", 400));
  }

  let packet = await Packet.findById(id);

  if (!packet) {
    return next(new ErrorHandler("Packet not Found", 404));
  }

  cloudinary.v2.uploader.destroy(packet.image.public_id);

  await Packet.remove();
  res.status(200).json({
    message: "Packet deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const packet = await Packet.find(req.params.id);
  if (!packet) {
    return next(new ErrorHandler("Packet not Found", 404));
  }
  res.status(200).json({
    packet,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const packets = await Packet.find();
  res.status(200).json({
    packets,
    success: true,
  });
});
