import express from "express";
let router = express.Router();

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
} from "../controllers/schedule";

router.route("/upsert-schedule").post(createOrUpdate);
router.route("/update-status-schedule").put(updateStatus);
router.route("/get-single-user-schedule").get(getSingleUser);
router.route("/get-single-packet-schedule").get(getSinglePacket);
router.route("/get-user-schedule").get(getUserScheduleByDate);
router.route("/get-packet-schedule").get(getPacketScheduleByDate);
router.route("/delete-schedule").delete(remove);
router.route("/sent-mail-patient").post(sendMail);
router.route("/create-user-booking-schedule").put(createUserBooking);
router.route("/patient-confirm-booking").put(patientUpdateStatus);

module.exports = router;
