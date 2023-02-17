import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    image,
    password,
    gender,
    phone,
    positionId,
    dateOfBirth,
    province,
    detailAddress,
    clinicId,
    specialtyId,
    priceId,
    paymentId,
    introduce,
    note,
    detail,
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
  if (!password) {
    return next(new ErrorHandler("Required password", 400));
  }
  if (!gender) {
    return next(new ErrorHandler("Required gender", 400));
  }
  if (!phone) {
    return next(new ErrorHandler("Required phone", 400));
  }

  if (!positionId) {
    return next(new ErrorHandler("Required position id", 400));
  }
  if (!dateOfBirth) {
    return next(new ErrorHandler("Required day of birth", 400));
  }
  if (!province || !detailAddress) {
    return next(new ErrorHandler("Required address", 400));
  }
  // if (!clinicId) {
  //   return next(new ErrorHandler("Required clinic id", 400));
  // }
  // if (!specialtyId) {
  //   return next(new ErrorHandler("Required specialty id", 400));
  // }
  // if (!priceId) {
  //   return next(new ErrorHandler("Required price id", 400));
  // }
  // if (!paymentId) {
  //   return next(new ErrorHandler("Required payment id", 400));
  // }
  // if (!detail) {
  //   return next(new ErrorHandler("Required detail", 400));
  // }
  // if (!introduce) {
  //   return next(new ErrorHandler("Required introduce", 400));
  // }
  // if (!note) {
  //   return next(new ErrorHandler("Required note", 400));
  // }
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "user",
    width: 150,
    crop: "scale",
  });
  const createUser = await User.create({
    email,
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    password,
    gender,
    phone,
    positionId,
    dateOfBirth,
    roleId: "R1",
    address: {
      province,
      detail: detailAddress,
    },
    // detail: {
    //   clinicId,
    //   specialtyId,
    //   priceId,
    //   paymentId,
    //   introduce,
    //   note,
    //   detail,
    // },
  });

  res.status(200).json({
    createUser,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required user id", 400));
  }
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  cloudinary.v2.uploader.destroy(user.image.public_id);
  await User.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorHandler("Required user id", 400));
  }
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  await cloudinary.v2.uploader.destroy(user.image.public_id);

  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "user",
    width: 150,
    crop: "scale",
  });

  req.body.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    user,
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  res.status(200).json({
    user,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    users,
    success: true,
  });
});
