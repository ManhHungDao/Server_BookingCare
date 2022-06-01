import db from "../models/index";
import CRUDService from "../services/CRUDService";

exports.getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(
      "🚀 ~ file: homeController.js ~ line 11 ~ getHomePage ~ error",
      error
    );
  }
};

exports.getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

exports.getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

exports.postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("createNewUser");
};

exports.displayGetCRUD = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", { dataTable: data });
};
