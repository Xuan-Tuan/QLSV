const { DataTypes, Model } = require("sequelize");
const { AuthenticationPersistence } = require("./authentication");

class LecturerPersistence extends Model {}

const modelName = "Lecturer";

const initLecturer = (sequelize) => {
  LecturerPersistence.init(
    {
      lecturerId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      authId: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "lecturer",
    }
  );
};

module.exports = { initLecturer, LecturerPersistence, modelName };
