import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Packet from "../models/packet";
import moment from "moment";
import Patient from "../models/patient"

// gửi email có chứa mã số xác nhận tài khoản tạo
exports.sendMailConfirm = catchAsyncErrors(async (req, res, next) => {
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