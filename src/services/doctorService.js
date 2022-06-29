import db from "../models/index";
import _ from "lodash";

require("dotenv").config();

exports.getTopDoctorHomeService = async (limit) => {
  return await db.User.findAll({
    limit: limit,
    where: { roleId: "R2" },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.Allcode,
        as: "positionData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "genderData",
        attributes: ["valueEN", "valueVI"],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      // if (result && result.image) {
      //   result.image = new Buffer.from(result.image, "base64").toString("binary");
      // }
      return {
        errCode: 0,
        message: "get top doctor succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get top doctor home failed",
      };
    });
};

exports.getAllDoctorService = async () => {
  return await db.User.findAll({
    where: { roleId: "R2" },
    // attributes: ["firstName", "lastName"],
    attributes: { exclude: ["password", "image"] },
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get all doctor succeed",
        data: result,
      };
    })
    .catch(() => {
      return {
        errCode: 1,
        message: "get all doctor failed",
        data: result,
      };
    });
};

exports.saveDetailDoctorService = async (detailDoctor) => {
  const action = detailDoctor.action;
  if (action === "CREATE")
    return await db.Markdown.create({
      contentHTML: detailDoctor.contentHTML,
      contentMarkdown: detailDoctor.contentMarkdown,
      doctorId: detailDoctor.doctorId,
      description: detailDoctor.description,
    })
      .then(() => {
        return {
          errCode: 0,
          message: "create detail doctor succeed",
        };
      })
      .catch(() => {
        return {
          errCode: 1,
          message: "error from sever",
        };
      });
  else if (action === "EDIT")
    return await db.Markdown.update(
      {
        contentHTML: detailDoctor.contentHTML,
        contentMarkdown: detailDoctor.contentMarkdown,
        description: detailDoctor.description,
      },
      {
        where: {
          doctorId: detailDoctor.doctorId,
        },
      }
    )
      .then(() => {
        return {
          errCode: 0,
          message: "create detail doctor succeed",
        };
      })
      .catch(() => {
        return {
          errCode: 1,
          message: "error from sever",
        };
      });
};

exports.getDetaiDoctorByIdService = async (id) => {
  return await db.User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.Markdown,
        attributes: ["description", "contentHTML", "contentMarkdown"],
      },
      {
        model: db.Allcode,
        as: "positionData",
        attributes: ["valueEN", "valueVI"],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      if (result && result.image) {
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
      }
      if (!result) {
        result = {};
      }
      return {
        errCode: 0,
        message: "get detail doctor by id succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: doctorService.js ~ line 146 ~ exports.getDetaiDoctorByIdService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "error from sever",
      };
    });
};

exports.postBulkCreateScheduleService = async (data, doctorId, date) => {
  if (data && data.length > 0) {
    data.map((item) => {
      item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;
      return item;
    });
  }
  // check existed cow -> will change database

  let existing = await db.Schedule.findAll({
    where: { doctorId: doctorId, date: date },
    attributes: ["timeType", "date", "doctorId", "maxNumber"],
    raw: true,
  });
  if (existing && existing.length > 0) {
    existing = existing.map((item) => {
      item.date = new Date(item.date).getTime();
      return item;
    });
  }
  let toCreate = _.differenceWith(data, existing, (a, b) => {
    return a.timeType === b.timeType && a.date === b.date;
  });
  console.log(
    "🚀 ~ file: doctorService.js ~ line 184 ~ exports.postBulkCreateScheduleService= ~ toCreate",
    toCreate
  );
  if (toCreate && toCreate.length > 0)
    return await db.Schedule.bulkCreate(toCreate)
      .then(() => {
        return {
          errCode: 0,
          message: "create bulk doctor schedule time succeed",
        };
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: doctorService.js ~ line 170 ~ exports.postBulkCreateScheduleService= ~ err",
          err
        );
        return {
          errCode: 1,
          message: "create bulk doctor schedule time failed",
        };
      });
};
