const { DataTypes, Model } = require("sequelize");
const { AuthenticationPersistence } = require("./authentication");

class ParentPersistence extends Model {}

const modelName = "Parent";

const initParent = (sequelize) => {
  ParentPersistence.init(
    {
      parentId: {
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
      tableName: "parent",
    }
  );
};

module.exports = { initParent, ParentPersistence, modelName };
