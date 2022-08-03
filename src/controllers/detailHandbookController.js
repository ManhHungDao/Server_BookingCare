import detailHandbookService from "../services/detailHandbookService";

exports.createDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .createDetailHandbookService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 11 ~ exports.createDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.updateDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .updateDetailHandbookService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 30 ~ exports.getDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.deleteDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .deleteDetailHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 30 ~ exports.getDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .getDetailHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 64 ~ exports.getDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
