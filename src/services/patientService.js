import db from "../models/index";
import _ from "lodash";

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
      if (result && result[0]) {
        const data = result[0];
        db.Booking.findOrCreate({
          where: { patientId: data.id },
          defaults: {
            statusId: "R3",
            doctorI: data.doctorId,
            patientId: data.id,
            date: data.date,
            timeType: data.timeType,
          },
          raw: true,
        });
      }
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: patientService.js ~ line 22 ~ exports.postBookAppoinmentService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get top doctor home failed",
      };
    });
};
