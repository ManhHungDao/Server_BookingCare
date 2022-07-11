import specialtyService from "../services/specialtyService";

exports.createSpecialty = async (req, res) => {
  const data = req.body;
  return await specialtyService
    .createSpecialtyService(data)
    .then((result) => {
      console.log("create specialty");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 11 ~ exports.createSpecialty= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getSpecialties = async (req, res) => {
  return await specialtyService
    .getSpecialtiesService()
    .then((result) => {
      console.log("get specialties");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 32 ~ exports.getSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListSpecialty = async (req, res) => {
  return await specialtyService
    .getListSpecialtyService()
    .then((result) => {
      console.log("get list specialty");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 51 ~ exports.getListSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};


exports.getDetailSpecialty = async (req, res) => {
  return await specialtyService
    .getDetailSpecialtyService(req.body.id)
    .then((result) => {
      console.log("get detail specialty");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 72 ~ exports.getDetailSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
