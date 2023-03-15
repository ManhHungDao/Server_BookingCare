import express from "express";
let router = express.Router();
import { create } from "../controllers/handbook";

router.route("/create-handbook").post(create);

module.exports = router;
