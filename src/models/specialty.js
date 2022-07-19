"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Doctor_Info, {
        foreignKey: "specialtyId",
        as: "doctorSpecialtyData",
      });
    }
  }
  Specialty.init(
    {
      clinicId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      contentMarkdown: DataTypes.TEXT,
      contentHTML: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
