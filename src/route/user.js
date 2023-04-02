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
} from "../controllers/user.js";

import { getAllCount } from "../controllers/dashboard";

router.route("/create-user").post(create);
router.route("/delete-user").delete(remove);
router.route("/update-user").put(update);
router.route("/get-user").get(getSingle);
router.route("/get-all-user").get(getAll);
router.route("/get-all-count").get(getAllCount);
router.route("/get-all-user-home").get(getAllHomePatient);
router.route("/get-user-by-specialty-home").get(getAllDoctorBySpecialtyHome);

module.exports = router;
