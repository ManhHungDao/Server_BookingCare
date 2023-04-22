import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Prescription from "../models/prescription";
import _ from "lodash";

exports.upsert = catchAsyncErrors(async (req, res, next) => {
  const { scheduleId, detail, result } = req.body;
  if (!scheduleId) {
    return next(new ErrorHandler("Required scheduleId", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }
  if (!result) {
    return next(new ErrorHandler("Required result", 400));
  }
  // let prescription;
  // const check = await Prescription.findOne({ scheduleId: scheduleId });
  // if (!check)
  //   prescription = await Prescription.create({
  //     scheduleId,
  //     detail,
  //     result,
  //   });
  // else {
  //   let options = {
  //     upsert: true,
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   };
  //   prescription = await Prescription.findOneAndUpdate(
  //     { scheduleId: scheduleId },
  //     req.body,
  //     options
  //   );
  // }
  let options = {
    upsert: true,
    new: true,
    runValidators: true,
    useFindAndModify: false,
  };
  let prescription = await Prescription.findOneAndUpdate(
    { scheduleId: scheduleId },
    req.body,
    options
  );
  res.status(200).json({
    prescription,
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;

  if (!id) {
    return next(new ErrorHandler("Required scheduleId", 400));
  }

  const prescription = await Prescription.findOne({
    scheduleId: id,
  });

  if (!prescription)
    return res.status(200).json({
      success: false,
    });

  res.status(200).json({
    prescription,
    success: true,
  });
});
