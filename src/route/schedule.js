import express from "express";
let router = express.Router();

import { createOrUpdate ,getSingle,remove} from "../controllers/schedule";

router.route("/upsert-schedule").post(createOrUpdate);
router.route("/get-schedule").get(getSingle);
router.route("/delete-schedule").delete(remove);

module.exports = router;

