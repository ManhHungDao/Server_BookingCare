import express from "express";
let router = express.Router();

import {
  update,
  create,
  getAll,
  getAllHomePatient,
  remove,
  getSingle,
  increatmentViews,
} from "../controllers/clinic.js";
router.route("/create-clinic").post(create);
router.route("/delete-clinic").delete(remove);
router.route("/update-clinic").put(update);
router.route("/get-clinic").get(getSingle);
router.route("/get-all-clinic").get(getAll);
router.route("/get-all-clinic-home").get(getAllHomePatient);
router.route("/increment-view-count").post(increatmentViews);

module.exports = router;
