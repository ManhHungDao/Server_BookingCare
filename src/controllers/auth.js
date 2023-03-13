import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken";

exports.login = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or Password", 400));
  }
  const user = await User.findOne({
    email
  }, "email name roleId password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 400));
  }
  sendToken(user, 200, res);
});

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    oldPassword,
    newPassword
  } = req.body;
  if (!oldPassword) {
    return next(new ErrorHandler("Requied old password", 400));
  }
  if (!newPassword) {
    return next(new ErrorHandler("Requied new password", 400));
  }
  const user = await User.findOne({
    email
  }, "email name roleId password");
  if (!user) {
    return next(new ErrorHandler("Không thể xác định tài khoản", 400));
  }
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Mật khẩu cũ chưa chính xác", 400));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const {
    email
  } = req.body;
  const user = await User.findOne({
    email
  }, "email name roleId password");
  if (!user) {
    return next(new ErrorHandler("Không thể xác định tài khoản", 400));
  }
  user.password = "123456Aa.";
  await user.save();
  sendToken(user, 200, res);
});