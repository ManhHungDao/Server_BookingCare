import db from "../models/index";
import _ from "lodash";
import { raw } from "body-parser";

exports.createClinicService = async (data) => {
  if (
    !data.name ||
    !data.address ||
    !data.contentMarkdown ||
    !data.contentHTML ||
    !data.image
  )
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.create({
    name: data.name,
    address: data.address,
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
    image: data.image,
  })
    .then(() => {
      console.log("create a new clinic");
      return {
        errCode: 0,
        message: "create a new clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "create a new clinic failed",
      };
    });
};

exports.getDetailClinicService = async (id) => {
  if (!id)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
  })
    .then((result) => {
      console.log("get detail clinic succeed");
      if (!result) result = {};
      else {
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
      }
      return {
        errCode: 0,
        message: "get detail clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get detail clinic failed",
      };
    });
};

exports.getListClinicService = async () => {
  return await db.Clinic.findAll({
    attributes: ["name", "id"],
  })
    .then((result) => {
      console.log("get list clinic succeed");
      return {
        errCode: 0,
        message: "get list clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list clinic failed",
      };
    });
};

exports.getListClinicHomeService = async () => {
  return await db.Clinic.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((result) => {
      if (!result) {
        result = {};
      } else if (result && result.length > 0) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      console.log("get list clinic  home succeed");
      return {
        errCode: 0,
        message: "get list clinic home succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list clinic home failed",
      };
    });
};

exports.getListDoctorClinicService = async (data) => {
  const { provinceId, clinicId } = data;
  let result = {};
  try {
    if (!clinicId) {
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    }
    if (provinceId !== "all")
      result = await db.Doctor_Info.findAll({
        where: { provinceId: provinceId, clinicId: clinicId },
        attributes: { exclude: ["clinicId", "createdAt", "updatedAt"] },
      });
    else {
      result = await db.Doctor_Info.findAll({
        where: { clinicId: clinicId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    }
    console.log("get list doctor clinic succeed");
    return {
      errCode: 0,
      message: "get list doctor clinic succeed",
      data: result,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: "get list doctor clinic failed",
    };
  }
};

exports.updateDetailClinicService = async (data) => {
  if (
    !data.name ||
    !data.address ||
    !data.contentMarkdown ||
    !data.contentHTML ||
    !data.image ||
    !data.id
  )
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.update(
    {
      contentHTML: data.contentHTML,
      contentMarkdown: data.contentMarkdown,
      name: data.name,
      image: data.image,
      address: data.address,
    },
    { where: { id: data.id } }
  )
    .then(() => {
      console.log("updated clinic succeed");
      return {
        errCode: 0,
        message: "updated clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "updated clinic failed",
      };
    });
};

exports.deleteClinicService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Clinic.destroy({ where: { id: id } })
    .then(() => {
      console.log("delete clinic succeed");
      return {
        errCode: 0,
        message: "delete clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "delete clinic failed",
      };
    });
};

exports.createDetailClinicService = async (data) => {
  if (!data.clinicId)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.detail_clinic
    .create({
      clinicId: data.clinicId,
      bookingMarkdown: data.bookingMarkdown ? data.bookingMarkdown : null,
      bookingHTML: data.bookingHTML ? data.bookingHTML : null,
      introduceMarkdown: data.introduceMarkdown ? data.introduceMarkdown : null,
      introduceHTML: data.introduceHTML ? data.introduceHTML : null,
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : null,
      strengthHTML: data.strengthHTML ? data.strengthHTML : null,
      equipmentMarkdown: data.equipmentMarkdown ? data.equipmentMarkdown : null,
      equipmentHTML: data.equipmentHTML ? data.equipmentHTML : null,
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : null,
      serviceHTML: data.serviceHTML ? data.serviceHTML : null,
      locationMarkdown: data.locationMarkdown ? data.locationMarkdown : null,
      locationHTML: data.locationHTML ? data.locationHTML : null,
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : null,
      examinationHTML: data.examinationHTML ? data.examinationHTML : null,
    })
    .then(() => {
      console.log("create new detail clinic");
      return {
        errCode: 0,
        message: "create new detail clinic succeed",
      };
    })
    .catch((err) => {
      console.log("🚀 ~ file: clinicService.js ~ line 249 ~ exports.createDetailClinicService= ~ err", err)
      return {
        errCode: 1,
        message: "create new detail clinic failed",
      };
    });
};
