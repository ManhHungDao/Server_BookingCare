import express from "express";
let router = express.Router();
const { isAuthunticatedUser, authorizeRole } = require("../middlewares/auth");

import {
  update,
  create,
  getAll,
  remove,
  getSingle,
} from "../controllers/user.js";

import {getAllCount} from "../controllers/dashboard";

router.route("/create-user").post(create);
router.route("/delete-user").delete(remove);
router.route("/update-user").put(update);
router.route("/get-user").get(getSingle);
router.route("/get-all-user").get(getAll);
router.route("/get-all-count").get(getAllCount);

module.exports = router;
