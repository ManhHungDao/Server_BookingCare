import db from "../models/index";
import bcrypt from "bcryptjs";

exports.handleUserLogin = async (email, password) => {
  try {
    let userData = {};
    const isExist = await checkUserEmail(email);
    if (isExist) {
      const user = await db.User.findOne({
        attributes: ["roleId", "email", "password"],
        where: { email: email },
        raw: true,
      });
      if (user) {
        const check = await bcrypt.compareSync(password, user.password);
        if (check) {
          delete user.password;
          userData = {
            errCode: 0,
            message: "Ok",
            user: user,
          };
        } else {
          userData = {
            errCode: 3,
            message: "Wrong password",
          };
        }
      } else {
        userData = { errCode: 2, message: "User is not exist " };
      }
    } else {
      userData = { errCode: 1, message: "Email is not exist " };
    }
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkUserEmail = async (email) => {
  const existUser = await db.User.findOne({ where: { email: email } }).catch(
    (err) => {
      throw new Error(err.message);
    }
  );
  if (existUser) return true;
  return false;
};
