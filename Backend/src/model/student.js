const { DataTypes, Model } = require("sequelize");
const { AuthenticationPersistence } = require("./authentication");

class StudentPersistence extends Model {}

const modelName = "Student";

const initStudent = (sequelize) => {
  StudentPersistence.init(
    {
      MSSV: {
        type: DataTypes.STRING(8),
        primaryKey: true,
      },
      RFID: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING(300),
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
      parentId: {
        type: DataTypes.STRING(10),
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
      tableName: "student",
    }
  );

  StudentPersistence.belongsTo(AuthenticationPersistence, {
    foreignKey: "authId",
    as: "authentication",
    targetKey: "authId",
  });
};

module.exports = { initStudent, StudentPersistence, modelName };
