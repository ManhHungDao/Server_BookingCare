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
