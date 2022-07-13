import clinicService from "../services/clinicService";

exports.createClinic = async (req, res) => {
  return await clinicService
    .createClinicService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 12 ~ exports.createClinic=async ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailClinic = async (req, res) => {
  return await clinicService
    .getDetailClinicService(req.query.id)
    .then((result) => {
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
