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
      // {
      //   model: db.Specialty,
      //   as: "doctorSpecialtyData",
      // },
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
          message: "update detail doctor succeed",
        };
      })
      .catch(() => {
        return {
          errCode: 1,
          message: "update detail doctor failed",
        };
      });
};

exports.saveSubDetailDoctorService = async (data) => {
  const existedDetail = await db.Doctor_Info.findOne({
    where: { doctorId: data.doctorId },
    raw: false,
  });
  if (!existedDetail) {
    return await db.Doctor_Info.create({
      doctorId: data.doctorId,
      priceId: data.selectedPrice,
      provinceId: data.selectedProvince,
      paymentId: data.selectedPayment,
      note: data.note,
      nameClinic: data.nameClinic,
      addressClinic: data.addressClinic,
      clinicId: data.clinicId,
      specialtyId: data.specialtyId,
    })
      .then(() => {
        return {
          errCode: 0,
          message: "create sub detail doctor succeed",
        };
      })
      .catch(() => {
        return {
          errCode: 1,
          message: "create sub detail doctor failed",
        };
      });
  } else {
    return await db.Doctor_Info.update(
      {
        priceId: data.selectedPrice,
        provinceId: data.selectedProvince,
        paymentId: data.selectedPayment,
        note: data.note,
        nameClinic: data.nameClinic,
        addressClinic: data.addressClinic,
        clinicId: data.clinicId,
        specialtyId: data.specialtyId,
      },
      {
        where: {
          doctorId: data.doctorId,
        },
      }
    )
      .then(() => {
        return {
          errCode: 0,
          message: "update sub detail doctor succeed",
        };
      })
      .catch(() => {
        return {
          errCode: 1,
          message: "update sub detail doctor failed",
        };
      });
  }
};

exports.getDetaiDoctorService = async (id) => {
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
      {
        model: db.Doctor_Info,
        attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
        include: [
          {
            model: db.Allcode,
            as: "priceTypeData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "provinceTypeData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "paymentTypeData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
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
      return {
        errCode: 1,
        message: "get detail doctor by id failed",
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
  // if (existing && existing.length > 0) {
  //   existing = existing.map((item) => {
  //     item.date = new Date(item.date).getTime();
  //     return item;
  //   });
  // }
  let toCreate = _.differenceWith(data, existing, (a, b) => {
    return a.timeType === b.timeType && +a.date === +b.date;
  });
  if (toCreate && toCreate.length > 0)
    return await db.Schedule.bulkCreate(toCreate)
      .then(() => {
        return {
          errCode: 0,
          message: "create bulk doctor schedule time succeed",
        };
      })
      .catch((err) => {
        return {
          errCode: 1,
          message: "create bulk doctor schedule time failed",
        };
      });
};

exports.getScheduleService = async (doctorId, date) => {
  return await db.Schedule.findAll({
    where: {
      doctorId: doctorId,
      date: date,
    },
    include: [
      {
        model: db.Allcode,
        as: "timeTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.User,
        as: "doctorData",
        attributes: ["firstName", "lastName"],
      },
    ],
    raw: false,
    nest: true,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get schedule by doctor id & date succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get schedule by doctor id & date failed",
      };
    });
};

exports.getExtraInfoDoctorService = async (id) => {
  return await db.Doctor_Info.findOne({
    attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
    where: { doctorId: id },
    include: [
      {
        model: db.Allcode,
        as: "priceTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "provinceTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "paymentTypeData",
        attributes: ["valueEN", "valueVI"],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get extra info doctor by id succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get extra info doctor by id failed",
      };
    });
};
