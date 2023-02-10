import express from "express";
let router = express.Router();

import {
  update,
  create,
  getAll,
  remove,
  getSingle,
} from "../controllers/user.js";

router.route("/create-user").post(create);
router.route("/delete-user").delete(remove);
router.route("/update-user").put(update);
router.route("/get-user").get(getSingle);
router.route("/get-all-user").get(getAll);

module.exports = router;
