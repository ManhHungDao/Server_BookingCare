import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";
require("dotenv").config();

exports.postBookAppoinmentService = async (data) => {
  return await db.User.findOrCreate({
    where: { email: data.email },
    defaults: {
      email: data.email,
      roleId: "R3",
    },
    raw: true,
  })
    .then((result) => {
      sendMail({
        reciverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: "",
      });
      if (result && result[0]) {
        db.Booking.findOrCreate({
          where: { patientId: result[0].id },
          defaults: {
            statusId: "R3",
            doctorId: data.doctorId,
            patientId: result[0].id,
            date: data.date,
            timeType: data.timeType,
          },
          raw: true,
        });
      }
    })
    .then(() => {
      return {
        errCode: 0,
        message: "post booking succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: patientService.js ~ line 45 ~ exports.postBookAppoinmentService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "post booking failed",
      };
    });
};

async function sendMail(email) {
  await emailService
    .sendSimpleEmail(email)
    .then(() => {
      console.log("send maild succeed");
    })
    .catch((err) => console.log(err));
}
