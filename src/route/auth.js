import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import {
  login,
  changePassword,
  resetPassword,
  patientLogin,
  patientChangePassword,
  patientResetPassword,
} from "../controllers/auth";

router.route("/login").post(login);
router.route("/change-password").patch(isAuthunticatedUser, changePassword);
router.route("/reset-password").patch(isAuthunticatedUser, resetPassword);
router.route("/patient-login").post(patientLogin);
router.route("/patient-change-password").patch(isAuthunticatedUser,patientChangePassword);
router.route("/patient-reset-password").patch(patientResetPassword);

module.exports = router;
