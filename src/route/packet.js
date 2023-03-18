import express from "express";
let router = express.Router();

import { create, getAll, getSingle, remove } from "../controllers/packet";

router.route("/create-packet").post(create);
router.route("/get-packet").get(getSingle);
router.route("/delete-packet").delete(remove);
router.route("/get-all-packet").get(getAll);

module.exports = router;
