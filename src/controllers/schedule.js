import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Schedule from "../models/schedule";
import User from "../models/user";
import nodemailer from "nodemailer";
import _ from "lodash";
exports.createOrUpdate = catchAsyncErrors(async (req, res, next) => {
  let { doctor, packet, detail, schedule, date, note } = req.body;
  if (!doctor && !packet) {
    return next(new ErrorHandler("Required doctor or name packet", 400));
  }
  if (!detail) {
    return next(new ErrorHandler("Required detail", 400));
  }
  if (!schedule) {
    return next(new ErrorHandler("Required schedule", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }

  let query = {
    $and: [
      {
        date: date,
      },
      {
        "doctor.id": doctor.id,
      },
      {
        "packet.id": packet.id,
      },
    ],
  };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  let upsertSchedule = await Schedule.findOneAndUpdate(
    query,
    req.body,
    options
  );
  res.status(200).json({
    upsertSchedule,
    success: true,
  });
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const { id, date } = req.query;
  if (!id) {
    return next(new ErrorHandler("Required doctor id", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  const schedule = await Schedule.findOne({
    "doctor.id": id,
    date: date,
  }).populate({
    path: "doctor.id",
    select: "email image.url detail.clinic.name detail.specialty.name ",
  });
  if (!schedule) {
    return res.status(200).json({
      success: false,
    });
  }
  res.status(200).json({
    schedule,
    success: true,
  });
});

exports.getUserScheduleByDate = catchAsyncErrors(async (req, res, next) => {
  let { page, size, sort, filter, clinicId, date } = req.query;

  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!page) {
    page = 1;
  }
  size = parseInt(size);
  if (!size) {
    size = 10;
  }

  let length = 0;
  let schedules = null;
  if (clinicId) {
    schedules = await Schedule.find({ "doctor.id": { $ne: null }, date: date })
      .populate({
        path: "doctor.id",
        match: { "detail.clinic.id": clinicId },
        select: "email image.url detail.clinic.name detail.specialty.name ",
      })
      .skip(size * page - size)
      .limit(size);
    schedules = schedules.filter((e) => e.doctor.id !== null);
    length = schedules.length;
    if (length > 10) {
      schedules = schedules.slice(size * page - size, size * page);
    }
  } else if (filter) {
    schedules = await Schedule.find({
      "doctor.id": { $ne: null },
      date: date,
      "doctor.name": {
        $regex: filter,
        $options: "i",
      },
    })
      .populate({
        path: "doctor.id",
        select: "email image.url detail.clinic.name detail.specialty.name ",
      })
      .skip(size * page - size)
      .limit(size);
    length = schedules.length;
  } else {
    schedules = await Schedule.find({ "doctor.id": { $ne: null }, date: date })
      .populate({
        path: "doctor.id",
        select: "email image.url detail.clinic.name detail.specialty.name ",
      })
      .skip(size * page - size)
      .limit(size);
    length = await Schedule.find({
      "doctor.id": { $ne: null },
      date: date,
    }).count();
  }

  res.status(200).json({
    schedules,
    count: length,
    success: true,
  });
});

exports.getPacketScheduleByDate = catchAsyncErrors(async (req, res, next) => {
  let { page, size, sort, clinicId, date } = req.query;

  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!page) {
    page = 1;
  }
  size = parseInt(size);
  if (!size) {
    size = 10;
  }

  let length = 0;
  let schedules = null;
  if (clinicId) {
    schedules = await Schedule.find({ "packet.id": { $ne: null }, date: date })
      .populate({
        path: "packet.id",
        match: { "clinic.id": clinicId },
        select: "image clinic specialty",
      })
      .skip(size * page - size)
      .limit(size);
    schedules = schedules.filter((e) => e.packet.id !== null);
    length = schedules.length;
  } else {
    schedules = await Schedule.find({ "packet.id": { $ne: null }, date: date })
      .populate({
        path: "packet.id",
        select: "image clinic specialty",
      })
      .skip(size * page - size)
      .limit(size);
    length = schedules.length;
  }

  res.status(200).json({
    schedules,
    count: length,
    success: true,
  });
});

exports.getSinglePacket = catchAsyncErrors(async (req, res, next) => {
  const { id, date } = req.query;
  if (!id) {
    return next(new ErrorHandler("Required packet id", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  const schedule = await Schedule.findOne({
    "packet.id": id,
    date: date,
  });
  if (!schedule) {
    return res.status(200).json({
      success: false,
    });
  }
  res.status(200).json({
    schedule,
    success: true,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const { id, date } = req.query;
  if (!id) {
    return next(new ErrorHandler("Required doctor id", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  await Schedule.findOneAndRemove({
    "doctor.id": id,
    date: date,
  });
  res.status(200).json({
    message: "Schedule deleted successfully",
    success: true,
  });
});

exports.sendMail = catchAsyncErrors(async (req, res, next) => {
  const { to, subject, html } = req.body;
  if (!to) return next(new ErrorHandler("Required patient's email", 400));
  if (!subject) return next(new ErrorHandler("Required title email", 400));
  if (!html) return next(new ErrorHandler("Required message body email", 400));

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: '"HealthCare" <daomanhhung1202@gmail.com>',
    to: to,
    subject: subject,
    html: html,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
  res.status(200).json({
    message: "Send mail successfully",
    success: true,
  });
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
  let { doctorId, packetId, date, status, time } = req.body;
  if (!doctorId && !packetId) {
    return next(new ErrorHandler("Required doctor id or  packet id", 400));
  }
  if (!status) {
    return next(new ErrorHandler("Required status", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!time) {
    return next(new ErrorHandler("Required time", 400));
  }
  let query = {
    date: date,
    "doctor.id": doctorId,
    "packet.id": packetId,
    "schedule.time": time,
  };
  let options = { upsert: false, new: true, setDefaultsOnInsert: true };

  let schedule = await Schedule.findOneAndUpdate(
    query,
    {
      $set: {
        "schedule.$.status": req.body.status,
      },
    },
    options
  );

  res.status(200).json({
    schedule,
    success: true,
  });
});

exports.createUserBooking = catchAsyncErrors(async (req, res, next) => {
  let { doctorId, packetId, date, patient, time } = req.body;
  if (!doctorId && !packetId) {
    return next(new ErrorHandler("Required doctor id or  packet id", 400));
  }
  if (!patient) {
    return next(new ErrorHandler("Required patient information", 400));
  }
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!time) {
    return next(new ErrorHandler("Required time", 400));
  }
  let query = {
    date: date,
    "doctor.id": doctorId,
    "packet.id": packetId,
    "schedule.time": time,
  };
  let options = { upsert: false, new: true, setDefaultsOnInsert: true };

  let schedule = await Schedule.findOneAndUpdate(
    query,
    {
      $set: {
        "schedule.$.user.email": patient.email,
        "schedule.$.user.name": patient.name,
        "schedule.$.user.phone": patient.phone,
        "schedule.$.user.address": patient.address,
        "schedule.$.user.gender": patient.gender,
        "schedule.$.user.dayOfBirth": patient.date,
        "schedule.$.user.reason": patient.reason,
        "schedule.$.status": "Lịch hẹn mới",
      },
    },
    options
  );

  res.status(200).json({
    schedule,
    success: true,
  });
});

exports.patientUpdateStatus = catchAsyncErrors(async (req, res, next) => {
  let { doctorId, packetId, date, time } = req.body;
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!time) {
    return next(new ErrorHandler("Required time", 400));
  }
  if (!doctorId && !packetId) {
    return next(new ErrorHandler("Required doctor id or packet id", 400));
  }
  console.log("🚀packetId:", packetId);
  let query = {
    date: date,
    "doctor.id": doctorId === "null" ? null : doctorId,
    "packet.id": packetId === "null" ? null : packetId,
    "schedule.time": time,
    "schedule.status": "Lịch hẹn mới",
  };
  let options = { upsert: false, new: true, setDefaultsOnInsert: true };

  await Schedule.findOneAndUpdate(query, {
    $set: { "schedule.$.status": "Đã xác nhận" },
    options,
  });

  res.status(200).json({
    success: true,
  });
});

exports.patientUpdateComment = catchAsyncErrors(async (req, res, next) => {
  let { doctorId, packetId, date, time, rating, comment } = req.body;
  if (!date) {
    return next(new ErrorHandler("Required date", 400));
  }
  if (!time) {
    return next(new ErrorHandler("Required time", 400));
  }
  if (!rating) {
    return next(new ErrorHandler("Required rating", 400));
  }
  if (!comment) {
    return next(new ErrorHandler("Required comment", 400));
  }
  let query = {
    "doctor.id": doctorId === "null" ? null : doctorId,
    "packet.id": packetId === "null" ? null : packetId,
    "schedule.time": time,
    "schedule.status": "Hoàn thành",
  };
  let options = { upsert: false, new: true, setDefaultsOnInsert: true };

  await Schedule.findOneAndUpdate(
    query,
    {
      $set: {
        "schedule.$.rating": rating,
        "schedule.$.comment": comment,
      },
    },
    options
  );

  res.status(200).json({
    success: true,
  });
});
