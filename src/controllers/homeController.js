import db from('../models/index')

let getHomePage =async (req, res) => {
    try {
        const data =  await db.User.findAll()
        console.log("🚀 ~ file: homeController.js ~ line 6 ~ getHomePage ~ data", data)
        return res.render("homepage.ejs");
    } catch (error) {
    console.log("🚀 ~ file: homeController.js ~ line 7 ~ getHomePage ~ error", error)
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
