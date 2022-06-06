import db from "../models/index";
import CRUDService from "../services/CRUDService";
import userService from "../services/userService";

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing unput parameters",
    });
  }
  const userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

exports.handleGetAllUers = async (req, res) => {
  const id = req.body.id;
  const users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    message: "ok",
    user: users,
  });
};
