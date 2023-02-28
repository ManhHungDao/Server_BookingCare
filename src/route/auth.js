import express from "express";
let router = express.Router();

import { login } from "../controllers/auth";

router.route("/login").post(login);

module.exports = router;
