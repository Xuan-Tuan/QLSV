const { DataTypes, Model } = require("sequelize");

class CourseStudentPersistence extends Model {}

const modelName = "CourseStudent";

const initCourseStudent = (sequelize) => {
  CourseStudentPersistence.init(
    {
      courseId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      MSSV: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
      tableName: "coursestudent",
    }
  );
};

module.exports = { initCourseStudent, CourseStudentPersistence, modelName };
