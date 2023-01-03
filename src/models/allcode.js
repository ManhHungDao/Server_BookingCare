// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Allcode extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Allcode.hasMany(models.User, {
//         foreignKey: "positionId",
//         as: "positionData",
//       });
//       Allcode.hasMany(models.User, {
//         foreignKey: "gender",
//         as: "genderData",
//       });
//       Allcode.hasMany(models.Patient, {
//         foreignKey: "gender",
//         as: "genderDataPatient",
//       });
//       Allcode.hasMany(models.Schedule, {
//         foreignKey: "timeType",
//         as: "timeTypeData",
//       });
//       Allcode.hasMany(models.Doctor_Info, {
//         foreignKey: "priceId",
//         as: "priceTypeData",
//       });
//       Allcode.hasMany(models.Doctor_Info, {
//         foreignKey: "provinceId",
//         as: "provinceTypeData",
//       });
//       Allcode.hasMany(models.Doctor_Info, {
//         foreignKey: "paymentId",
//         as: "paymentTypeData",
//       });
//       Allcode.hasMany(models.Booking, {
//         foreignKey: "timeType",
//         as: "timeTypeDataPatient",
//       });
//     }
//   }
//   Allcode.init(
//     {
//       keyMap: DataTypes.STRING,
//       type: DataTypes.STRING,
//       valueEN: DataTypes.STRING,
//       valueVI: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Allcode",
//     }
//   );
//   return Allcode;
// };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const allcodeSchema = new Schema({
  keyMap: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  valueEN: {
    type: String,
    required: true,
  },
  valueVI: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Allcode", allcodeSchema);
