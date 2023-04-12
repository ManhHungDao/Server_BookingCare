import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import { sendMail } from "../controllers/mail";
import { create, getSingle, update } from "../controllers/patient";

router.route("/sent-mail-confirm-register").post(sendMail);
router.route("/register").post(create);
router.route("/get-infor-account").get(isAuthunticatedUser, getSingle);
router.route("/update-infor-account").put(isAuthunticatedUser, update);

module.exports = router;
