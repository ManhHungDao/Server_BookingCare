import db from "../models/index";
import CRUDService from "../services/CRUDService";
import userService from "../services/userService";

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input parameters",
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
  const id = req.query.id; // change body => query
  const users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    user: users,
  });
};

exports.handleCreateNewUser = async (req, res) => {
  if (!req.body.email)
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  const message = await userService.createNewUsers(req.body);
  return res.status(200).json(message);
};

exports.handleEditUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  }
  const message = await userService.updateUser(req.body);
  return res.status(200).json(message );
};

exports.handleDeleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  }
  const message = await userService.deleteUser(id);
  return res.status(200).json(message );
};
