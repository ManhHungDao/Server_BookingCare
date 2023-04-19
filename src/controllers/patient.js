import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken";
import cloudinary from "cloudinary";
import Packet from "../models/packet";
import Schedule from "../models/schedule";
import moment from "moment";
import Patient from "../models/patient";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, gender, phone, dateOfBirth, address } =
    req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Required email", 400));
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

  const patient = await Patient.create({
    email,
    name,
    password,
    gender,
    phone,
    dateOfBirth,
    address,
  });

  res.status(200).json({
    patient,
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("Required id", 400));
  }

  const patient = await Patient.findById(id).select("-password");
  if (!patient) {
    return next(new ErrorHandler("Patient not Found", 404));
  }

  res.status(200).json({
    patient,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("Required id", 400));
  }

  let patient = await Patient.findById(id);
  if (!patient) {
    return next(new ErrorHandler("Patient not Found", 404));
  }

  patient = await Patient.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    patient,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  let { page, size, sort, filter } = req.query;

  page = parseInt(page);
  if (!page) {
    page = 1;
  }
  size = parseInt(size);
  if (!size) {
    size = 10;
  }
  let length = 0;
  let users = null;
  if (filter) {
    users = await Patient.find(
      {
        name: {
          $regex: filter,
          $options: "i",
        },
      },
      "-password"
    )
      .skip(size * page - size)
      .limit(size);
    length = await Patient.find(
      {
        name: {
          $regex: filter,
          $options: "i",
        },
      },
      "-password"
    ).count();
  } else {
    users = await Patient.find()
      .select("-password")
      .skip(size * page - size)
      .limit(size);
    length = await Patient.find().count();
  }
  res.status(200).json({
    users,
    count: length,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required account id", 400));
  }
  let patient = await Patient.findById(id);
  if (!patient) {
    return next(new ErrorHandler("Account not Found", 404));
  }

  await Patient.deleteOne({
    _id: id,
  });
  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// dùng để sửa dữ liệu ảo đã thêm
exports.updateFakeData = catchAsyncErrors(async (req, res, next) => {
  // User.updateMany({"created": false}, {"$set":{"created": true}});
  let fakeAddress = {
    province: "Quảng Nam",
    detail: "Nguyễn Huệ, Old Town, Minh An, Hội An, Quảng Nam, Việt Nam",
    lat: "15.878428",
    lng: "108.3311789",
  };

  // await Patient.updateMany(
  //   { password: "password" },
  //   {
  //     $set: {
  //       password:
  //         "$2a$10$PAwYcHip0O77COta/DSDu.Bm2I8L6ywbaq8GTLHxhlsjvHd/sj9lG",
  //     },
  //   }
  // );

  await Schedule.updateMany(
    { schedule: { $elemMatch: { status: "Hoàn thành" } } },
    {
      $set: {
        "schedule.$.rating": 5,
        "schedule.$.comment": "Dịch vụ rất tốt",
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "updated successfully",
  });
});
