const { DataTypes, Model } = require("sequelize");

class AttendancePersistence extends Model {}

const modelName = "Attendance";

const initAttendance = (sequelize) => {
  AttendancePersistence.init(
    {
      attended: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      MSSV: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
      },
      scheduleId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "attendance",
    }
  );
};

module.exports = { initAttendance, AttendancePersistence, modelName };
