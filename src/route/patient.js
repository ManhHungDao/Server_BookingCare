import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import { sendMailConfirm } from "../controllers/patient";

router.route("/sent-mail-confirm").post(isAuthunticatedUser, sendMailConfirm);
// router.route("/get-packet").get(getSingle);
// router.route("/delete-packet").delete(isAuthunticatedUser, remove);
// router.route("/get-all-packet").get(getAll);
// router.route("/update-packet").put(isAuthunticatedUser, update);

module.exports = router;
