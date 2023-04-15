import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import { upsert, getSingle } from "../controllers/prescription";

router.route("/create-prescription").post(isAuthunticatedUser, upsert);
router.route("/get-single-prescription").get(isAuthunticatedUser, getSingle);

module.exports = router;
