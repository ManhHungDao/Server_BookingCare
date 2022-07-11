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
      return {
        errCode: 1,
        message: "create specialty failed",
      };
    });
};

exports.getSpecialtiesService = async () => {
  return await db.Specialty.findAll()
    .then((result) => {
      if (result && result.length > 0) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};

exports.getListSpecialtyService = async () => {
  return await db.Specialty.findAll({
    attributes: ["name", "id"],
  })
    .then((result) => {
      console.log("get list specialty succeed");
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyService.js ~ line 64 ~ exports.getListSpecialtiesService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};

exports.getDetailSpecialtyService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Specialty.findOne({
    attributes: { exclude: ["image", "createdAt", "updatedAt"] },
    where: { id: id },
    // raw: false,
    // nest: true,
    // include: [
    //   {
    //     model: db.Doctor_Info,
    //     as: "doctorSpecialtyData",
    //     attributes: { exclude: ["specialtyId", "createdAt", "updatedAt"] },
    //   },
    // ],
  })
    .then((result) => {
      console.log("get list succeed");
      return {
        errCode: 0,
        message: "get detail specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyService.js ~ line 88 ~ exports.getDetailSpecialtyService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "error from sever",
      };
    });
};

exports.getDoctorSpecialtyService = async (data) => {
  const { specialtyId, provinceId } = data;
  let result = {};
  try {
    if (!specialtyId) {
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    }
    if (provinceId)
      result = await db.Doctor_Info.findAll({
        where: { specialtyId: specialtyId, provinceId: provinceId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    else {
      result = await db.Doctor_Info.findAll({
        where: { specialtyId: specialtyId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    }
    console.log("get list doctor spoecialty succeed");
    return {
      errCode: 0,
      message: "get list doctor specialty succeed",
      data: result,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: specialtyService.js ~ line 121 ~ exports.getDoctorSpecialtyService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "get list doctor specialty failed",
    };
  }
};
