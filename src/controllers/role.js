import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import _ from "lodash";

exports.addRole = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    message: "role added",
    success: true,
  });
});

exports.deleteRole = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    message: "role deleted",
    success: true,
  });
});
