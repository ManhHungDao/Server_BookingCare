import express from "express";
let router = express.Router();
import { create ,getAll,getSingle,remove} from "../controllers/handbook";

router.route("/create-handbook").post(create);
router.route("/get-all-handbook").get(getAll);
router.route("/get-single-handbook").get(getSingle);
router.route("/remove-handbook").delete(remove);

module.exports = router;
