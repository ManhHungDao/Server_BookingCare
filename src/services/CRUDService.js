import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

exports.createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        image: data.image,
        roleId: data.roleId,
        positionId: data.positionId,
      });
      resolve("created new user ");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(e);
    }
  });
};

exports.getAllUser = () => {
  return new Promise((resolve, reject) => {
    try {
      const users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) resolve(user);
      else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateUser = async (user) => {

  return await db.User.update(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
    },
    {
      where: {
        id: user.id,
      },
    }
  ).catch((error) => error);
};

exports.deleteUser = async (userId) => {
  return  await db.User.destroy({
    where: {
      id: userId,
    },
  }).catch((error) => error);
};
