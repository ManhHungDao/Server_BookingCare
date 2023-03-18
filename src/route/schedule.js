import express from "express";
let router = express.Router();

import { createOrUpdate ,getSingle} from "../controllers/schedule";

router.route("/upsert-schedule").post(createOrUpdate);
router.route("/get-schedule").get(getSingle);

module.exports = router;

