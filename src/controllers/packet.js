import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Packet from "../models/packet";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { name, image, specialty, clinic, price, introduce, detail } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }
  if (!price) {
    return next(new ErrorHandler("Required price", 400));
  }
  if (!clinic) {
    return next(new ErrorHandler("Required clinic", 400));
  }
  if (!introduce) {
    return next(new ErrorHandler("Required introduce", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "packet",
  });
  const packet = await Packet.create({
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    specialty,
    clinic,
    price,
    introduce,
    detail,
  });
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

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required packet id", 400));
  }

  let packet = await Packet.findById(id);

  if (!packet) {
    return next(new ErrorHandler("Packet not Found", 404));
  }
  cloudinary.v2.uploader.destroy(packet.image.public_id);
  await User.deleteOne({
    _id: id,
  });
  res.status(200).json({
    message: "Packet deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required packet id", 400));
  }
  const packet = await Packet.findById(id);
  if (!packet) {
    return next(new ErrorHandler("Packet not Found", 404));
  }
  res.status(200).json({
    packet,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  let { page, size, sort, filter, clinicId } = req.query;
  page = parseInt(page);
  if (!page) {
    page = 1;
  }
  size = parseInt(size);
  if (!size) {
    size = 10;
  }
  let length = 0;
  let packets = null;
  if (clinicId) {
    packets = await Packet.find({
      "clinic.id": clinicId,
    });
    length = packets.length;
    if (length > 10) {
      packets = packets.slice(size * page - size, size * page);
    }
  } else if (filter) {
    packets = await Packet.find({
      name: {
        $regex: filter,
        $options: "i",
      },
    });
    length = packets.length;
    if (length > 10) {
      packets = packets.slice(size * page - size, size * page);
    }
  } else {
    packets = await Packet.find({ roleId: { $not: { $regex: "R0" } } })
      .select("-password")
      .skip(size * page - size)
      .limit(size);
    length = await Packet.count();
  }

  res.status(200).json({
    packets,
    count: length,
    success: true,
  });
});
