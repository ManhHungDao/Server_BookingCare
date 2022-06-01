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
  // return res.send(message);
  res.redirect("/get-crud");
};

exports.displayGetCRUD = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", { dataTable: data });
};

exports.getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    if (userData) {
      return res.render("editCRUD", {
        user: userData,
      }); // co thể bỏ đuôi ejs
    } else {
      return res.send("user not found");
    }
  } else {
    return res.send("user not found");
  }
};

exports.putCRUD = async (req, res) => {
  return await CRUDService.updateUser(req.body)
    .then(res.redirect("/get-crud"))
    .catch((error) => console.log(error));
  // return res.redirect("/get-crud");
};

exports.deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  await CRUDService.deleteUser(userId).then(res.redirect("/get-crud"));
};
