import patientService from "../services/patientService";

exports.postBookAppoinment = async (req, res) => {
  const data = req.body;
  if (!data.email) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  }
  return await patientService
    .postBookAppoinmentService(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch(() => {
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
