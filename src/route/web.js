import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/top-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
  router.post("/api/save-sub-info-doctor", doctorController.postSubInfoDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);

  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule", doctorController.getSchedule);
  router.get("/api/get-extra-info-doctor", doctorController.getExtraInfoDoctor);

  router.post("/api/patient-book-appointment", patientController.postBookAppoinment);

  return app.use("/", router);
};

module.exports = initWebRoutes;
