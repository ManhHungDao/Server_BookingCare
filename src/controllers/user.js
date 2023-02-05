import user from "../models/user";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    gender,
    phone,
    roleId,
    positionId,
    dateOfBirth,
    // image,
    // clinicId,
    // specialtyId,
    // priceId,
    // paymentId,
    // introduce,
    // note,
    // detail,
  } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Required email", 400));
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
  if (!roleId) {
    return next(new ErrorHandler("Required role id", 400));
  }
  if (!positionId) {
    return next(new ErrorHandler("Required position id", 400));
  }
  if (!dateOfBirth) {
    return next(new ErrorHandler("Required day of birth", 400));
  }
  // if (!image) {
  //   return next(new ErrorHandler("Required image", 400));
  // }
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
  const createUser = await user.create({
    name,
    email,
    // password,
    // gender,
    // phone,
    // roleId,
    // positionId,
    // image,
    // dateOfBirth,
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
    success: true,
    createUser,
  });
});

// exports.create = async (req, res, next) => {
//   const {
//     name,
//     email,
//     password,
//     gender,
//     phone,
//     roleId,
//     positionId,
//     // image,
//     dateOfBirth,
//     // clinicId,
//     // specialtyId,
//     // priceId,
//     // paymentId,
//     // introduce,
//     // note,
//     // detail,
//   } = req.body;
//   console.log("im here");
//   console.log("check req,body", req.body);

//   const createUser = await user.create({
//     name,
//     email,
//     password,
//     gender,
//     phone,
//     roleId,
//     positionId,
//     // image,
//     dateOfBirth,
//     // detail: {
//     //   clinicId,
//     //   specialtyId,
//     //   priceId,
//     //   paymentId,
//     //   introduce,
//     //   note,
//     //   detail,
//     // },
//   });
//   res.status(200).json({
//     success: true,
//     createUser,
//   });
// };

// exports.login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;
//   checkUserInput(req.body);
//   const createUser = await user.create({
//     email,
//     password,
//   });
//   res.status(200).json({
//     success: true,
//     createUser,
//   });
// });