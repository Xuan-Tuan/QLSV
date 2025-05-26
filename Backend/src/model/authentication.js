const { DataTypes, Model } = require("sequelize");

class AuthenticationPersistence extends Model {}

const modelName = "Authentication";

const initAuthentication = (sequelize) => {
  AuthenticationPersistence.init(
    {
      authId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "authentication",
    }
  );
};

module.exports = { initAuthentication, AuthenticationPersistence, modelName };
