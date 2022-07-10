import clinicService from "../services/clinicService";

exports.createClinic = (req, res) => {};

exports.getClinics = async (req, res) => {
  return await clinicService
    .getClinicsService()
    .then((result) => {
      console.log("get clinics");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: clinicController.js ~ line 16 ~ err", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
exports.getListClinic = async (req, res) => {
  return await clinicService
    .getListClinicService()
    .then((result) => {
      console.log("get list clinic");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: clinicController.js ~ line 36 ~ err", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
