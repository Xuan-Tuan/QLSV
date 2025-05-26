const { DataTypes, Model } = require("sequelize");
const { AuthenticationPersistence } = require("./authentication");

class AdminPersistence extends Model {}

const modelName = "Admin";

const initAdmin = (sequelize) => {
  AdminPersistence.init(
    {
      adminId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: true,
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
      tableName: "admin",
    }
  );
  // AdminPersistence.belongsTo(AuthenticationPersistence, {
  //   foreignKey: "authId",
  //   targetKey: "authId",
  // });
};

module.exports = { initAdmin, AdminPersistence, modelName };
