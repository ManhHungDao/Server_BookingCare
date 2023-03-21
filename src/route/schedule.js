import express from "express";
let router = express.Router();

import {
  createOrUpdate,
  getSingle,
  remove,
  sendMail,
  getUserScheduleByDate
} from "../controllers/schedule";

router.route("/upsert-schedule").post(createOrUpdate);
router.route("/get-schedule").get(getSingle);
router.route("/get-user-schedule").get(getUserScheduleByDate);
router.route("/delete-schedule").delete(remove);
router.route("/sent-mail-patient").post(sendMail);

module.exports = router;
