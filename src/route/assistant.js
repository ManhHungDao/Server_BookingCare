import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import { create } from "../controllers/assistant";

router.route("/create-new-assistant").post(create);
module.exports = router;
