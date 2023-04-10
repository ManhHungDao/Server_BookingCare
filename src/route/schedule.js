import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import {
  createOrUpdate,
  getSingleUser,
  remove,
  sendMail,
  getUserScheduleByDate,
  updateStatus,
  getPacketScheduleByDate,
  getSinglePacket,
  createUserBooking,
  patientUpdateStatus,
  patientUpdateFeeback,
  patientCheckAllowUpdateFeeback,
} from "../controllers/schedule";

router.route("/upsert-schedule").post(isAuthunticatedUser, createOrUpdate);
router.route("/update-status-schedule").put(isAuthunticatedUser, updateStatus);
router.route("/get-single-user-schedule").get(getSingleUser);
router.route("/get-single-packet-schedule").get(getSinglePacket);
router.route("/get-user-schedule").get(getUserScheduleByDate);
router.route("/get-packet-schedule").get(getPacketScheduleByDate);
router.route("/delete-schedule").delete(isAuthunticatedUser, remove);
router.route("/sent-mail-patient").post(isAuthunticatedUser, sendMail);
router.route("/create-user-booking-schedule").put(createUserBooking);
router.route("/patient-confirm-booking").put(patientUpdateStatus);
router.route("/patient-feedback").put(patientUpdateFeeback);
router.route("/check-patient-feedback").get(patientCheckAllowUpdateFeeback);

module.exports = router;
