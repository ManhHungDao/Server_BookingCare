import db from "../models/index";

exports.createDetailHandbookService = async (data) => {
  if (
    !data.title ||
    !data.handbookId ||
    !data.note ||
    !data.description ||
    !data.contentMarkdown ||
    !data.image ||
    !data.contentHTML
  ) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.create({
    handbookId: data.handbookId,
    title: data.title,
    note: data.note,
    description: data.description,
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
    image: data.image,
  })
    .then(() => {
      return {
        errCode: 0,
        message: "create detail handbook succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 29 ~ exports.createDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create detail handbook failed",
      };
    });
};

exports.updateDetailHandbookService = async (data) => {
  if (
    !data.id ||
    !data.image ||
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
      title: data.title,
      note: data.note,
      description: data.description,
      contentMarkdown: data.contentMarkdown,
      contentHTML: data.contentHTML,
      image: data.image,
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
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 74 ~ exports.updateDetailHandbookService= ~ err",
        err
      );
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
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 101 ~ exports.deleteDetailHandbookService ~ err",
        err
      );
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
      return {
        errCode: 0,
        message: "get detail handbook succeed",
        data: result ? result : "",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 126 ~ exports.getDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail handbook failed",
      };
    });
};
