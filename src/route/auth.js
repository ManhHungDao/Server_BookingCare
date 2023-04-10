import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import { login, changePassword, resetPassword } from "../controllers/auth";

router.route("/login").post(login);
router.route("/change-password").patch(isAuthunticatedUser, changePassword);
router.route("/reset-password").patch(isAuthunticatedUser, resetPassword);

module.exports = router;
