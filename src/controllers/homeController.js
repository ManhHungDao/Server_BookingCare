import db from "../models/index";

let getHomePage = async (req, res) => {
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

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
