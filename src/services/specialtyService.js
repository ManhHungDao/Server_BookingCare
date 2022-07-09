import db from "../models/index";

exports.createSpecialtyService = async (data) => {
  if (!data.image || !data.contentHTML || !data.contentMarkdown || !data.name)
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  return await db.Specialty.create({
    name: data.name,
    image: data.image,
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "create specialty succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyService.js ~ line 14 ~ exports.createSpecialtyService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create specialty failed",
      };
    });
};
