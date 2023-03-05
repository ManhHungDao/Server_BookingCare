import express from "express";
let router = express.Router();

import { getAll, remove, update } from "../controllers/allcode";

router.route("/get-all-allcode").get(getAll);
router.route("/delete-allcode").delete(remove);
router.route("/update-allcode").put(update);

module.exports = router;
