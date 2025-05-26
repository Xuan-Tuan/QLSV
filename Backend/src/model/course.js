const { DataTypes, Model } = require("sequelize");

class CoursePersistence extends Model {}

const modelName = "Course";

const initCourse = (sequelize) => {
  CoursePersistence.init(
    {
      courseId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      nameCourse: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      startDay: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      numberWeek: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      onlineUrl: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: true,
        unique: true,
      },
      lecturerId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      roomId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "course",
    }
  );
};

module.exports = { initCourse, CoursePersistence, modelName };
