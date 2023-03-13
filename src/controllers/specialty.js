import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Specialty from "../models/specialty";
import User from "../models/user";
import _ from "lodash";

exports.create = catchAsyncErrors(async (req, res, next) => {
  const {
    popular,
    name,
    clinic,
    image,
    detail,
    key
  } = req.body;
  if (!name) {
    return next(new ErrorHandler("Required name", 400));
  }
  if (!key) {
    return next(new ErrorHandler("Required key", 400));
  }
  if (!image) {
    return next(new ErrorHandler("Required image", 400));
  }

  let existed = null;
  if (popular === false) {
    existed = await Specialty.findOne({
      "clinic.id": clinic.id,
      key: key,
    });
  } else {
    existed = await Specialty.findOne({
      key: key,
      popular: true
    });
  }
  if (existed !== null)
    return next(new ErrorHandler("Duplicate specialty", 400));
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "specialty",
    width: 250,
    crop: "scale",
  });
  const specialty = await Specialty.create({
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    clinic,
    detail: detail ? detail : null,
    popular,
    key,
  });
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required specialty id", 400));
  }
  let specialty = await Specialty.findById(id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  if (req.body.image !== null) {
    await cloudinary.v2.uploader.destroy(specialty.image.public_id);
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "specialty",
    });
    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } else req.body.image = {
    ...specialty.image
  };
  specialty = await Specialty.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required specialty id", 400));
  }
  let specialty = await Specialty.findById(id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  const key = specialty.key;

  // kiểm tra chuyên khoa có tồn tại trong người dùng
  const user = await User.findOne({
    "detail.specialty.id": key
  });
  if (user) return next(new ErrorHandler("Existed feild in other model", 500));
  // kiểm tra chuyên khoa có bài đăng

  cloudinary.v2.uploader.destroy(specialty.image.public_id);
  await Specialty.deleteOne({
    _id: id
  });
  res.status(200).json({
    message: "Specialty deleted successfully",
    success: true,
  });
});

exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  const specialty = await Specialty.findById(req.query.id);
  if (!specialty) {
    return next(new ErrorHandler("Specialty not Found", 404));
  }
  res.status(200).json({
    specialty,
    success: true,
  });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
  let {
    page,
    size,
    sort,
    filter,
    clinicId
  } = req.query;

  page = parseInt(page);
  if (!page) {
    page = 1;
  }
  size = parseInt(size);
  if (!size) {
    size = 10;
  }
  let length = 0;
  let specialties = null;
  if (clinicId) {
    specialties = await Specialty.find({
      "clinic.id": clinicId
    }).limit(size)
    length = specialties.length
    if (length > 10) {
      specialties = listSpecialties.slice((size * page - size), (size * page))
    }

  } else
  if (filter !== null) {
    specialties = await Specialty.find({
      'name': {
        '$regex': filter,
        '$options': 'i'
      }
    })
    length = specialties.length
    if (length > 10) {
      specialties = specialties.slice((size * page - size), (size * page))
    }
  } else {
    specialties = await Specialty.aggregate([{
      $skip: size * page - size
    }, {
      $limit: size
    }, ]);
    length = await Specialty.count();

  }
  res.status(200).json({
    specialties,
    success: true,
    count: length,
  });
});

exports.getByClinicId = catchAsyncErrors(async (req, res, next) => {
  const id = req.query.id;
  if (!id) {
    return next(new ErrorHandler("Required clinic id", 400));
  }
  const specialties = await Specialty.find({
    "clinic.id": id
  }, "_id name");
  res.status(200).json({
    specialties,
    success: true,
  });
});