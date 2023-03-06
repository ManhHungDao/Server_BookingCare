import express from "express";
let router = express.Router();

import {
  getByType,
  getAll,
  remove,
  update,
  create,
} from "../controllers/allcode";

router.route("/get-all-allcode").get(getAll);
router.route("/get-allcode-type").get(getByType);
router.route("/create-allcode").post(create);
router.route("/delete-allcode").delete(remove);
router.route("/update-allcode").put(update);

module.exports = router;
