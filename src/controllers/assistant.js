import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Allcode from "../models/allcode";
import Specialty from "../models/specialty";
import Schedule from "../models/schedule";
import Assistant from "../models/assistant";
import _ from "lodash";
import cloudinary from "cloudinary";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    image,
    password,
    gender,
    phone,
    dateOfBirth,
    address,
    doctor,
  } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Required email", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
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
  if (!doctor) {
    return next(new ErrorHandler("Required doctor", 400));
  }

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "assistant",
    width: 150,
  });
  const createAssistant = await Assistant.create({
    email,
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    password,
    gender,
    phone,
    dateOfBirth,
    address,
    doctor,
    roleId: "R4",
  });
  res.status(200).json({
    createAssistant,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const assistants = await Assistant.find()
    .populate({
      path: "doctor.id",
      select: "name image.url detail.clinic.name detail.specialty.name ",
    })
    .select("email name image phone doctor");
  let length = assistants.length;

  res.status(200).json({
    assistants,
    success: true,
    count: length,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  const assistant = await Assistant.findById(id);
  if (!assistant) {
    return next(new ErrorHandler("Assistant not Found", 404));
  }
  cloudinary.v2.uploader.destroy(assistant.image.public_id);
  await Assistant.deleteOne({
    _id: id,
  });
  res.status(200).json({
    success: true,
    message: "Assistant deleted successfully",
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  const assistant = await Assistant.findById(id)
    .populate({
      path: "doctor.id",
      select: "name image.url detail.clinic detail.specialty ",
    })
    .select("-password");
  // const assistant = await Assistant.findById(id);
  res.status(200).json({
    success: true,
    assistant,
  });
});
