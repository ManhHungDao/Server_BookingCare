import db from "../models/index";

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
};
