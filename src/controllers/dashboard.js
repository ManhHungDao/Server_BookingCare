import Clinic from "../models/clinic";
import Specialty from "../models/specialty";
import User from "../models/user";
import Handbook from "../models/handbook";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

exports.getAllCount = catchAsyncErrors(async (req, res, next) => {
  const clinic = await Clinic.count();
  const user = await User.count();
  const specialty = await Specialty.count();
  const handbook = await Handbook.count();

  res.status(200).json({
    count: {
      clinic,
      user: user - 1,
      specialty,
      handbook,
    },
    success: true,
  });
});
