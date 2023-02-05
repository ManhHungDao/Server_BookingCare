import express from "express";
let router = express.Router();

import { create } from "../controllers/user.js";

router.route("/create-new-user").post(create);

module.exports = router;
