import express from "express";
let router = express.Router();

import { login, changePassword, resetPassword } from "../controllers/auth";

router.route("/login").post(login);
router.route("/change-password").patch(changePassword);
router.route("/reset-password").patch(resetPassword);

module.exports = router;
