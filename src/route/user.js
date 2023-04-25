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
  suggestDoctorRecent,
  outStandingDoctor,
  getAllManager,
} from "../controllers/user.js";

import {
  getAllCount,
  getAllMedicalHistory,
  getAllDoctorAccount,
  getAllPatientAccount,
  getAllLocationClinic,
} from "../controllers/dashboard";

import { getRoleUser, upsert } from "../controllers/role.js";

router.route("/create-user").post(isAuthunticatedUser, create);
router.route("/delete-user").delete(isAuthunticatedUser, remove);
router.route("/update-user").put(isAuthunticatedUser, update);
router.route("/get-user").get(isAuthunticatedUser, getSingle);
router.route("/get-all-user").get(isAuthunticatedUser, getAll);
router.route("/get-all-user-home").get(getAllHomePatient);
router.route("/get-user-by-specialty-home").get(getAllDoctorBySpecialtyHome);
router.route("/get-user-by-province-home").get(getAllDoctorByProvince);
router.route("/suggest-doctor-recent").get(suggestDoctorRecent);
router.route("/get-outstading-doctor").get(outStandingDoctor);
router.route("/get-all-manager").get(isAuthunticatedUser, getAllManager);
// dashboard route
router.route("/get-all-count").get(isAuthunticatedUser, getAllCount);
router
  .route("/get-all-medical-history")
  .get(isAuthunticatedUser, getAllMedicalHistory);
router
  .route("/get-all-doctor-account")
  .get(isAuthunticatedUser, getAllDoctorAccount);
router
  .route("/get-all-patient-account")
  .get(isAuthunticatedUser, getAllPatientAccount);
router
  .route("/get-all-locaiton-clinic")
  .get(isAuthunticatedUser, getAllLocationClinic);
// role
router.route("/upsert-role-user").put(isAuthunticatedUser, upsert);
router.route("/get-role-user").get(isAuthunticatedUser, getRoleUser);

module.exports = router;
