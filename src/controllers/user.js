import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import sendToken from "../utils/jwtToken";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    image,
    password,
    gender,
    phone,
    position,
    dateOfBirth,
    specialty,
    clinic,
    price,
    payment,
    introduce,
    note,
    detail,
    address,
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
  if (!position) {
    return next(new ErrorHandler("Required position", 400));
  }
  if (!dateOfBirth) {
    return next(new ErrorHandler("Required day of birth", 400));
  }
  if (!address) {
    return next(new ErrorHandler("Required address", 400));
  }
  if (!clinic) {
    return next(new ErrorHandler("Required clinic", 400));
  }
  if (!specialty) {
    return next(new ErrorHandler("Required specialty", 400));
  }
  if (!price) {
    return next(new ErrorHandler("Required price", 400));
  }
  if (!payment) {
    return next(new ErrorHandler("Required payment", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }
  if (!introduce) {
    return next(new ErrorHandler("Required introduce", 400));
  }
  if (!note) {
    return next(new ErrorHandler("Required note", 400));
  }
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "user",
    width: 150,
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
    dateOfBirth,
    roleId: "R3",
    address,
    detail: {
      clinic,
      specialty,
      position,
      price,
      payment,
      introduce,
      note,
      detail,
    },
  });
  sendToken(createUser, 200, res);

  // res.status(200).json({
  //   createUser,
  //   success: true,
  // });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required user id", 400));
  }
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  await User.deleteOne({
    _id: id,
  });
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required user id", 400));
  }
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  if (req.body.image !== null) {
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
  } else
    req.body.image = {
      ...user.image,
    };
  user = await User.findByIdAndUpdate(id, req.body, {
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
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required handbook id", 400));
  }
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  res.status(200).json({
    user,
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
  let users = null;

  if (clinicId) {
    users = await User.find(
      {
        "detail.clinic.id": clinicId,
        roleId: { $not: { $regex: "R0" } },
      },
      "-password"
    )
      .skip(size * page - size)
      .limit(size);
    length = await User.find(
      {
        "detail.clinic.id": clinicId,
        roleId: { $not: { $regex: "R0" } },
      },
      "-password"
    ).count();
  } else if (filter) {
    users = await User.find(
      {
        name: {
          $regex: filter,
          $options: "i",
        },
        roleId: { $not: { $regex: "R0" } },
      },
      "-password"
    )
      .skip(size * page - size)
      .limit(size);
    length = await User.find(
      {
        name: {
          $regex: filter,
          $options: "i",
        },
        roleId: { $not: { $regex: "R0" } },
      },
      "-password"
    ).count();
  } else {
    users = await User.find({ roleId: { $not: { $regex: "R0" } } })
      .select("-password")
      .skip(size * page - size)
      .limit(size);
    length = await User.find({ roleId: { $not: { $regex: "R0" } } }).count();
  }

  res.status(200).json({
    users,
    success: true,
    count: length,
  });
});
