import doctorService from "../services/doctorService";

exports.getTopDoctorHome = async (req, res) => {
  let limit = req.body.limit;
  if (!limit) limit = 10;
  try {
    const doctors = await doctorService.getTopDoctorHomeService(+limit);
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};

exports.getAllDoctor = async (req, res) => {
  try {
    const data = await doctorService.getAllDoctorService();
    console.log("get all doctor from sever");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from sever",
    });
  }
};

exports.postInfoDoctor = async (req, res) => {
  try {
    if (
      !req.body.doctorId ||
      !req.body.contentHTML ||
      !req.body.contentMarkdown
    ) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing parameter",
      });
    }
    const response = await doctorService.saveDetailDoctorService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from sever",
    });
  }
};
