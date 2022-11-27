import db from "../models/index";

exports.createDetailHandbookService = async (data) => {
  if (
    !data.title ||
    !data.handbookId ||
    !data.note ||
    !data.description ||
    !data.contentMarkdown ||
    // !data.image ||
    !data.contentHTML
  ) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.create({
    handbookId: data.handbookId,
    title: data.title.trim(),
    note: data.note.trim(),
    description: data.description.trim(),
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
    image: data.image ? data.image : "",
  })
    .then(() => {
      return {
        errCode: 0,
        message: "create detail handbook succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "create detail handbook failed",
      };
    });
};

exports.updateDetailHandbookService = async (data) => {
  if (
    !data.id ||
    // !data.image ||
    !data.title ||
    !data.note ||
    !data.description ||
    !data.contentMarkdown ||
    !data.contentHTML
  ) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.update(
    {
      title: data.title.trim(),
      note: data.note.trim(),
      description: data.description.trim(),
      contentMarkdown: data.contentMarkdown,
      contentHTML: data.contentHTML,
      image: data.image ? data.image : "",
    },
    { where: { id: data.id } }
  )
    .then(() => {
      return {
        errCode: 0,
        message: "update detail handbook succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "update detail handbook failed",
      };
    });
};

exports.deleteDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.destroy({ where: { id: id } })
    .then(() => {
      return {
        errCode: 0,
        message: "delete detail handbook succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "delete detail handbook failed",
      };
    });
};

exports.getDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.findOne({ where: { id: id } })
    .then((result) => {
      if (result)
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
      return {
        errCode: 0,
        message: "get detail handbook succeed",
        data: result ? result : "",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get detail handbook failed",
      };
    });
};

exports.getListDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.findAll({ where: { handbookId: id } })
    .then((result) => {
      if (result) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      console.log("get list detail handbook succeed");
      return {
        errCode: 0,
        message: "get list detail handbook succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list detail handbook failed",
      };
    });
};

exports.getHandBookHomeService = async (limit, offset = 0) => {
  if (!limit || !offset) {
    return {
      errCode: -1,
      message: "limit and offset are required",
    };
  }
  return await db.Detail_handbook.findAll({
    attributes: ["image", "title", "id"],
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
    .then((result) => {
      if (result)
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      console.log("get handbook home succeed");
      return {
        errCode: 0,
        message: "get handbook home succeed",
        data: result ? result : {},
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 179 ~ exports.getHandBookHomeService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get handbook home failed",
      };
    });
};

exports.getRelatedHandbookService = async (id) => {
  return await db.Detail_handbook.findAll({
    limit: 6,
    attributes: ["image", "title", "id"],
    where: { handbookId: id },
  })
    .then((result) => {
      if (result)
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      console.log("get related handbook home succeed");
      return {
        errCode: 0,
        message: "get related handbook home succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get related handbook home failed",
      };
    });
};
