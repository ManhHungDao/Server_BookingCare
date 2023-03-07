import express from "express";
let router = express.Router();

import {
  update,
  create,
  getAll,
  remove,
  getSingle,getByClinicId
} from "../controllers/specialty";

router.route("/create-specialty").post(create);
router.route("/delete-specialty").delete(remove);
router.route("/update-specialty").put(update);
router.route("/get-specialty").get(getSingle);
router.route("/get-all-specialty").get(getAll);
router.route("/get-by-clinic").get(getByClinicId);

module.exports = router;
