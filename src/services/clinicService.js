import db from "../models/index";
import _ from "lodash";

exports.createClinicService = async (data) => {
  if (
    !data.name ||
    !data.address ||
    !data.contentMarkdown ||
    !data.contentHTML ||
    !data.image
  )
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.create({
    name: data.name,
    address: data.address,
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
    image: data.image,
  })
    .then(() => {
      console.log("create a new clinic");
      return {
        errCode: 0,
        message: "create a new clinic succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicService.js ~ line 14 ~ exports.cereateClinicService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create a new clinic failed",
      };
    });
};

exports.getDetailClinicService = async (id) => {
  return await db.Clinic.findOne({
    attributes: { exclude: ["image", "createdAt", "updatedAt"] },
    where: { id: id },
  })
    .then((result) => {
      console.log("get detail clinic succeed");
      return {
        errCode: 0,
        message: "get detail clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicService.js ~ line 52 ~ exports.getClinicsService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail clinic failed",
      };
    });
};

exports.getListClinicService = async () => {
  return await db.Clinic.findAll({
    attributes: ["name", "id"],
  })
    .then((result) => {
      console.log("get list clinic succeed");
      return {
        errCode: 0,
        message: "get list clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicService.js ~ line 76 ~ exports.getListClinicService= ~ err",
        err
      );

      return {
        errCode: 1,
        message: "get list clinic failed",
      };
    });
};
