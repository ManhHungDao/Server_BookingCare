import specialtyService from "../services/specialtyService";

exports.createSpecialty = async (req, res) => {
  const data = req.body;
  return await specialtyService
    .createSpecialtyService(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: specialtyController.js ~ line 11 ~ exports.createSpecialty= ~ err", err)
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
