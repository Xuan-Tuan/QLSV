const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { CourseStudentPersistence } = require("../model/courseStudent");
const { CoursePersistence } = require("../model/course");

const controller = {
  create: catchAsync(async (req, res) => {
    try {
      const { courseId, MSSV } = req.body;

      // Kiểm tra xem môn học có tồn tại không
      const course = await CoursePersistence.findOne({
        where: { courseId },
      });
      if (!course) {
        throw new ApiError(400, "Môn học không tồn tại");
      }

      // Tạo bản ghi mới nếu chưa tồn tại
      const [record, created] = await CourseStudentPersistence.findOrCreate({
        where: { courseId, MSSV },
        defaults: { courseId, MSSV },
      });

      if (!created) {
        throw new ApiError(400, "Sinh viên đã được đăng ký vào môn học này");
      }

      res.status(200).json({ status: "success", data: record });
    } catch (error) {
      console.error(error);
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { controller };
