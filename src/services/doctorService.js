import db from "../models/index";

exports.getTopDoctorHomeService = async (limit) => {
  return await db.User.findAll({
    limit: limit,
    where: { roleId: "R2" },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password", "image"] },
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

  //   try {
  //     const doctors = await db.User.findAll({
  //       limit: limit,
  //       //   where: { role: {$like:''} },
  //       attributes: { exclude: ["password", "image"] },
  //       order: [["createdAt", "DESC"]],
  //     });
  //      return {
  //        errCode: 0,
  //        message: "get top doctor succeed",
  //        data: doctors,
  //      };
  //   } catch (error) {
  //     return {
  //       errCode: 1,
  //       message: "error when get top doctor home",
  //     };
  //   }
};
