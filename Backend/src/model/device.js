const { DataTypes, Model } = require("sequelize");

class DevicePersistence extends Model {}

const modelName = "Device";

const initDevice = (sequelize) => {
  DevicePersistence.init(
    {
      deviceId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      roomId: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "device",
    }
  );
};

module.exports = { initDevice, DevicePersistence, modelName };
