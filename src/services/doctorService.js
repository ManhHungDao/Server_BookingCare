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
        message: "error when get top doctor home",
      };
    });
};
