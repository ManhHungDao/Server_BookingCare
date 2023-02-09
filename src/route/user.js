import express from "express";
let router = express.Router();

import { create ,getAll} from "../controllers/user.js";

router.route("/create-user").post(create);
router.route("/get-all-user").get(getAll);

module.exports = router;
