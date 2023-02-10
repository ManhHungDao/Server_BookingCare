import express from "express";
let router = express.Router();

import { getAll } from "../controllers/allcode";

router.route("/get-all-allcode").get(getAll);

module.exports = router;
