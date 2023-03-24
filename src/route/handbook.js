import express from "express";
let router = express.Router();
import {
  create,
  getAll,
  getSingle,
  remove,
  update,
  getAllHomePatient,getRelated
} from "../controllers/handbook";

router.route("/create-handbook").post(create);
router.route("/get-all-handbook").get(getAll);
router.route("/get-single-handbook").get(getSingle);
router.route("/delete-handbook").delete(remove);
router.route("/update-handbook").put(update);
router.route("/get-all-home-handbook").get(getAllHomePatient);
router.route("/get-related-handbook").get(getRelated);

module.exports = router;
