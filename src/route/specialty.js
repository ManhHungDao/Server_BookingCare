import express from "express";
let router = express.Router();

import {
  update,
  create,
  getAll,
  remove,
  getSingle,
} from "../controllers/specialty";

router.route("/create-specialty").post(create);
router.route("/delete-specialty").delete(remove);
router.route("/update-specialty").put(update);
router.route("/get-specialty").get(getSingle);
router.route("/get-all-specialty").get(getAll);

module.exports = router;
