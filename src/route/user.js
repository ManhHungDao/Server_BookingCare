import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import {
  update,
  create,
  getAll,
  remove,
  getSingle,
  getAllHomePatient,
  getAllDoctorBySpecialtyHome,
  getAllDoctorByProvince,
} from "../controllers/user.js";

import { getAllCount } from "../controllers/dashboard";

router.route("/create-user").post(isAuthunticatedUser, create);
router.route("/delete-user").delete(isAuthunticatedUser, remove);
router.route("/update-user").put(isAuthunticatedUser, update);
router.route("/get-user").get(isAuthunticatedUser, getSingle);
router.route("/get-all-user").get(isAuthunticatedUser, getAll);
router.route("/get-all-count").get(getAllCount);
router.route("/get-all-user-home").get(getAllHomePatient);
router.route("/get-user-by-specialty-home").get(getAllDoctorBySpecialtyHome);
router.route("/get-user-by-province-home").get(getAllDoctorByProvince);

module.exports = router;
