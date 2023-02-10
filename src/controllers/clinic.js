import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Clinic from "../models/clinic";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { name, province, detailAddress, image, logo, introduce, detail } =
    req.body;

  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }

  if (!province) {
    return next(new ErrorHandler("Required province", 400));
  }

  if (!detailAddress) {
    return next(new ErrorHandler("Required address detail", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }

  if (!introduce) {
    return next(new ErrorHandler("Required introduce", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }

  const resultImg = await cloudinary.v2.uploader.upload(image, {
    folder: "clinic",
    width: 150,
    crop: "scale",
  });
  const resultLogo = await cloudinary.v2.uploader.upload(logo, {
    folder: "clinic",
    width: 150,
    crop: "scale",
  });
  const createClinic = await Clinic.create({
    name,
    image: {
      public_id: resultImg.public_id,
      url: resultImg.secure_url,
    },
    logo: {
      public_id: resultLogo.public_id,
      url: resultLogo.secure_url,
    },
    address: {
      province,
      detail: detailAddress,
    },
    introduce,
    detail,
  });
  res.status(200).json({
    createClinic,
    message: "Create Clinic Success",
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
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
  const resultImg = await cloudinary.v2.uploader.upload(image, {
    folder: "clinic",
    width: 150,
    crop: "scale",
  });
  const resultLogo = await cloudinary.v2.uploader.upload(logo, {
    folder: "clinic",
    width: 150,
    crop: "scale",
  });
  res.status(200).json({
    clinic,
    success: true,
  });
  req.body.image = {
    public_id: resultImg.public_id,
    url: resultImg.secure_url,
  };
  req.body.logo = {
    public_id: resultLogo.public_id,
    url: resultLogo.secure_url,
  };

  clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    clinic,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
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
