import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController.js";
import detailClinicController from "../controllers/detailClinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);
  // doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/top-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
  router.post("/api/save-sub-info-doctor", doctorController.postSubInfoDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule", doctorController.getSchedule);
  router.get("/api/get-extra-info-doctor", doctorController.getExtraInfoDoctor);
  router.get("/api/get-list-patient", doctorController.getListPatient);

  // send remedy
  router.post("/api/send-remedy", doctorController.postSendSemedy);

  // patient
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppoinment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppoinment
  );

  // clinic
  router.post("/api/create-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getDetailClinic);
  // update clinic
  router.put("/api/update-detail-clinic", clinicController.updateDetailClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  // get list clinic for manage doctor
  router.get("/api/get-list-clinic", clinicController.getListClinic);
  router.get("/api/get-list-home-clinic", clinicController.getListClinicHome);
  //get list doctor clinic from home
  router.get(
    "/api/get-list-doctor-clinic",
    clinicController.getListDoctorClinic
  );

  // specialty
  router.post("/api/create-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getSpecialties);
  router.get(
    "/api/get-detail-specialty",
    specialtyController.getDetailSpecialty
  );
  router.get(
    "/api/get-doctor-specialty",
    specialtyController.getDoctorSpecialty
  );
  //get list specialty by clinicId
  router.get(
    "/api/get-list-specialty-by-clinicId",
    specialtyController.getListSpecialtyByClinicId
  );
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.put("/api/update-specialty", specialtyController.updateSpecialty);

  /*  detail clinic */
  router.post(
    "/api/create-detail-clinic",
    detailClinicController.createDetailClinic
  );
  router.get("/api/get-detail-clinic", detailClinicController.getDetailClinic);

  // without col image
  router.get("/api/get-list-specialty", specialtyController.getListSpecialty);

  return app.use("/", router);
};

module.exports = initWebRoutes;
