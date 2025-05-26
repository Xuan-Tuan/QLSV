const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { AuthenticationPersistence } = require("../model/authentication");
const config = require("../config/config");
const { v4 } = require("uuid");
const {
  generateShortCode,
  generateNumericShortCode,
  generateSchedule,
  formattedDate,
} = require("../utils/common");
const { sequelize } = require("../config/sequelize");
const { Op } = require("sequelize");
const { CoursePersistence } = require("../model/course");
const { CourseStudentPersistence } = require("../model/courseStudent");
const { StudentPersistence } = require("../model/student");
const { LecturerPersistence } = require("../model/lecturer");
const { RoomPersistence } = require("../model/room");
const { SchedulePersistence } = require("../model/schedule");
const { AttendancePersistence } = require("../model/attendance");
const moment = require("moment");
const validateTime = (timeString) => {
  return moment(timeString, "HH:mm", true)?.format("HH:mm:ss");
};

const controller = {
  create: catchAsync(async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const request = req.body;

      const {
        courseId,
        nameCourse,
        name,
        startDay,
        numberWeek,
        week,
        startTime,
        endTime,
        onlineUrl,
        onlineURL,
        lecturerId,
        lecturerID,
        roomId,
        roomID,
        students = [],
      } = request;

      // Kiểm tra trùng mã môn học
      const exist = await CoursePersistence.findOne({
        where: { courseId },
      });
      if (exist) {
        throw new ApiError(400, "Mã môn học đã tồn tại");
      }

      const courseData = {
        courseId,
        nameCourse: nameCourse || name,
        startDay: formattedDate(startDay),
        numberWeek: numberWeek || week,
        startTime: validateTime(startTime),
        endTime: validateTime(endTime),
        onlineUrl: onlineUrl || onlineURL,
        lecturerId: lecturerId || lecturerID,
        roomId: roomId || roomID,
      };

      await CoursePersistence.create(courseData, { transaction });

      // Tạo danh sách lịch học
      const scheduleList = generateSchedule(
        courseData.startDay,
        courseData.numberWeek
      );
      const dataSchedules = [];

      for (let e of scheduleList) {
        const dateSche = formattedDate(e.date);
        const [schedule] = await SchedulePersistence.findOrCreate({
          where: {
            courseId: courseData.courseId,
            dateSche,
          },
          defaults: {
            scheduleId: generateNumericShortCode(5, "SCH"),
            courseId: courseData.courseId,
            dateSche,
          },
          transaction,
        });
        dataSchedules.push(schedule);
      }

      // Gán sinh viên vào khóa học và tạo điểm danh
      for (let studentMSSV of students) {
        await CourseStudentPersistence.findOrCreate({
          where: {
            courseId: courseData.courseId,
            MSSV: studentMSSV,
          },
          defaults: {
            courseId: courseData.courseId,
            MSSV: studentMSSV,
          },
          transaction,
        });

        for (let schedule of dataSchedules) {
          await AttendancePersistence.findOrCreate({
            where: {
              MSSV: studentMSSV,
              scheduleId: schedule.scheduleId,
            },
            defaults: {
              MSSV: studentMSSV,
              scheduleId: schedule.scheduleId,
              attended: "FALSE",
            },
            transaction,
          });
        }
      }

      await transaction.commit();
      res.status(200).json({ status: "success", data: courseData });
    } catch (error) {
      await transaction.rollback();
      console.error("Create course error:", error);
      throw new ApiError(400, error.message);
    }
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();

    try {
      const request = req.body;
      const {
        nameCourse,
        name,
        startDay,
        numberWeek,
        week,
        startTime,
        endTime,
        onlineUrl,
        onlineURL,
        lecturerId,
        lecturerID,
        roomId,
        roomID,
        students = [],
      } = request;

      const existingCourse = await CoursePersistence.findOne({
        where: { courseId: id },
      });

      if (!existingCourse) throw new ApiError(400, "Môn học không tồn tại");

      const data = {
        courseId: id,
        nameCourse: nameCourse || name,
        startDay: formattedDate(startDay),
        numberWeek: numberWeek || week,
        startTime: validateTime(startTime),
        endTime: validateTime(endTime),
        onlineUrl: onlineUrl || onlineURL,
        lecturerId: lecturerId || lecturerID,
        roomId: roomId || roomID,
      };

      await CoursePersistence.update(data, {
        where: { courseId: id },
        transaction,
      });

      // Kiểm tra nếu lịch học thay đổi
      const oldStartDay = formattedDate(existingCourse.startDay);
      const oldNumberWeek = existingCourse.numberWeek;
      const isScheduleChanged =
        oldStartDay !== data.startDay ||
        Number(oldNumberWeek) !== Number(data.numberWeek);

      let dataSchedules = [];

      if (isScheduleChanged) {
        // Xoá lịch cũ
        await AttendancePersistence.destroy({
          where: {
            scheduleId: sequelize.literal(`scheduleId IN (
            SELECT scheduleId FROM schedule WHERE courseId = '${id}'
          )`),
          },
          transaction,
        });

        await SchedulePersistence.destroy({
          where: { courseId: id },
          transaction,
        });

        // Tạo lại lịch học mới
        const scheduleList = generateSchedule(data.startDay, data.numberWeek);

        for (const e of scheduleList) {
          const schedule = {
            scheduleId: generateNumericShortCode(5, "SCH"),
            courseId: id,
            dateSche: formattedDate(e.date),
          };
          await SchedulePersistence.create(schedule, { transaction });
          dataSchedules.push(schedule);
        }

        // Tạo lại attendance cho tất cả sinh viên đã đăng ký
        const allStudents = await CourseStudentPersistence.findAll({
          where: { courseId: id },
          attributes: ["MSSV"],
        });

        for (const student of allStudents) {
          for (const schedule of dataSchedules) {
            await AttendancePersistence.create(
              {
                MSSV: student.MSSV,
                attended: "FALSE",
                scheduleId: schedule.scheduleId,
              },
              { transaction }
            );
          }
        }
      } else {
        // Nếu lịch không thay đổi, lấy lại danh sách lịch cũ để sử dụng cho sinh viên mới
        dataSchedules = await SchedulePersistence.findAll({
          where: { courseId: id },
        });
      }

      // Xử lý danh sách sinh viên
      const currentStudents = await CourseStudentPersistence.findAll({
        where: { courseId: id },
        attributes: ["MSSV"],
      });
      const currentMSSVs = currentStudents.map((s) => s.MSSV);

      // Sinh viên cần xoá
      const studentsToRemove = currentMSSVs.filter(
        (mssv) => !students.includes(mssv)
      );
      if (studentsToRemove.length > 0) {
        await CourseStudentPersistence.destroy({
          where: { courseId: id, MSSV: studentsToRemove },
          transaction,
        });
        await AttendancePersistence.destroy({
          where: {
            MSSV: studentsToRemove,
            scheduleId: sequelize.literal(`scheduleId IN (
            SELECT scheduleId FROM schedule WHERE courseId = '${id}'
          )`),
          },
          transaction,
        });
      }

      // Sinh viên mới cần thêm
      const newStudents = students.filter(
        (mssv) => !currentMSSVs.includes(mssv)
      );

      for (const mssv of newStudents) {
        await CourseStudentPersistence.create(
          {
            courseId: id,
            MSSV: mssv,
          },
          { transaction }
        );

        for (const schedule of dataSchedules) {
          await AttendancePersistence.create(
            {
              MSSV: mssv,
              attended: "FALSE",
              scheduleId: schedule.scheduleId,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();
      res.status(200).json({ status: "success", data });
    } catch (error) {
      await transaction.rollback();
      throw new ApiError(400, error.message);
    }
  }),
  updateLink: catchAsync(async (req, res) => {
    const { id } = req.params;

    try {
      const request = req.body;

      const existingCourse = await CoursePersistence.findOne({
        where: { courseId: id },
      });

      if (!existingCourse) {
        throw new ApiError(400, "Môn học không tồn tại");
      }

      const onlineUrl = request?.onlineUrl || request?.onlineURL;
      if (!onlineUrl || typeof onlineUrl !== "string") {
        throw new ApiError(400, "Đường dẫn onlineUrl không hợp lệ");
      }

      const data = { onlineUrl };

      await CoursePersistence.update(data, { where: { courseId: id } });

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  getList: catchAsync(async (req, res) => {
    try {
      const { lecturerId, studentId, parentId } = req.query;
      let conditions = {};
      let courseIds = [];

      if (lecturerId) {
        conditions.lecturerId = lecturerId;
      }

      // Gộp logic lấy courseIds từ studentId hoặc parentId
      if (studentId || parentId) {
        let studentIds = [];

        if (studentId) {
          studentIds.push(studentId);
        }

        if (parentId) {
          const students = await StudentPersistence.findAll({
            where: { parentId },
            attributes: ["MSSV"],
            raw: true,
          });
          studentIds.push(...students.map((s) => s.MSSV));
        }

        if (studentIds.length === 0) {
          return res.status(200).json({ status: "success", data: [] });
        }

        const studentCourses = await CourseStudentPersistence.findAll({
          where: { MSSV: { [Op.in]: studentIds } },
          attributes: ["courseId"],
          raw: true,
        });

        courseIds = studentCourses.map((sc) => sc.courseId);

        if (courseIds.length === 0) {
          return res.status(200).json({ status: "success", data: [] });
        }

        conditions.courseId = { [Op.in]: courseIds };
      }

      const courses = await CoursePersistence.findAll({
        where: conditions,
        raw: true,
      });

      const data = await Promise.all(
        courses.map(async (course) => {
          const studentsInCourse = await CourseStudentPersistence.findAll({
            where: { courseId: course.courseId },
            attributes: ["MSSV"],
            raw: true,
          });

          const studentIds = studentsInCourse.map((s) => s.MSSV);

          const students =
            studentIds.length > 0
              ? await StudentPersistence.findAll({
                  where: { MSSV: { [Op.in]: studentIds } },
                  raw: true,
                })
              : [];

          const lecturer = await LecturerPersistence.findOne({
            where: { lecturerId: course.lecturerId },
            raw: true,
          });

          const room = await RoomPersistence.findOne({
            where: { roomId: course.roomId },
            raw: true,
          });

          return {
            ...course,
            students,
            lecturer,
            room,
          };
        })
      );

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  show: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      // Lấy thông tin môn học
      const course = await CoursePersistence.findOne({
        where: { courseId: id },
        raw: true,
      });

      if (!course) {
        return res
          .status(404)
          .json({ status: "error", message: "Môn học không tồn tại" });
      }

      // Lấy danh sách sinh viên của môn học
      const studentLinks = await CourseStudentPersistence.findAll({
        where: { courseId: id },
        attributes: ["MSSV"],
        raw: true,
      });

      const studentIds = studentLinks.map((s) => s.MSSV);

      // Lấy thông tin sinh viên
      const students = studentIds.length
        ? await StudentPersistence.findAll({
            where: { MSSV: { [Op.in]: studentIds } },
            raw: true,
          })
        : [];

      // Lấy lịch học
      const schedules = await SchedulePersistence.findAll({
        where: { courseId: id },
        raw: true,
      });

      const totalSessions = schedules.length;

      // Lấy tất cả điểm danh cho course này, có thể lọc trước để tránh dư
      // thực hiện sửa do thay đổi csdl, ko còn courseId trong bảng attendance
      // const allAttendances = await AttendancePersistence.findAll({
      //   where: {
      //     courseId: id,
      //     MSSV: { [Op.in]: studentIds },
      //     attended: "Present",
      //   },
      //   attributes: ["MSSV"],
      //   raw: true,
      // });
      const scheduleIds = schedules.map((s) => s.scheduleId);

      const allAttendances = await AttendancePersistence.findAll({
        where: {
          scheduleId: { [Op.in]: scheduleIds },
          MSSV: { [Op.in]: studentIds },
          attended: "Present",
        },
        attributes: ["MSSV"],
        raw: true,
      });

      // Tính số lần có mặt cho mỗi sinh viên
      const attendanceMap = {};
      allAttendances.forEach((a) => {
        if (!attendanceMap[a.MSSV]) {
          attendanceMap[a.MSSV] = 0;
        }
        attendanceMap[a.MSSV]++;
      });

      // Gộp dữ liệu sinh viên
      const studentData = students.map((s) => ({
        name: s.fullName,
        MSSV: s.MSSV,
        id: s.MSSV,
        attended: attendanceMap[s.MSSV] || 0,
        total: totalSessions,
      }));

      // Lấy thông tin giảng viên & phòng
      const lecturer = await LecturerPersistence.findOne({
        where: { lecturerId: course.lecturerId },
        raw: true,
      });

      const room = await RoomPersistence.findOne({
        where: { roomId: course.roomId },
        raw: true,
      });

      const data = {
        ...course,
        students: studentData,
        schedules,
        lecturer,
        room,
      };

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  deleteMethod: catchAsync(async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      const course = await CoursePersistence.findOne({
        where: { courseId: id },
        transaction,
        raw: true,
      });

      if (!course) {
        throw new ApiError(404, `Course with ID ${id} not found`);
      }

      // Xoá dữ liệu liên quan trước
      await SchedulePersistence.destroy({
        where: { courseId: id },
        transaction,
      });

      await AttendancePersistence.destroy({
        where: { courseId: id },
        transaction,
      });

      await CourseStudentPersistence.destroy({
        where: { courseId: id },
        transaction,
      });

      // Cuối cùng mới xoá course chính
      await CoursePersistence.destroy({
        where: { courseId: id },
        transaction,
      });

      await transaction.commit();
      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      await transaction.rollback();
      throw new ApiError(400, error.message);
    }
  }),
  getListAttendance: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      const course = await CoursePersistence.findOne({
        where: { courseId: id },
        raw: true,
      });

      if (!course) {
        throw new ApiError(404, `Course with ID ${id} not found`);
      }

      // Xử lý điều kiện lọc theo studentId hoặc parentId
      const { studentId, parentId } = req.query;
      let conditions = {};

      if (studentId) {
        conditions.MSSV = studentId;
      } else if (parentId) {
        const students = await StudentPersistence.findAll({
          where: { parentId },
          attributes: ["MSSV"],
          raw: true,
        });
        const studentIds = students.map((s) => s.MSSV);
        if (studentIds.length === 0) {
          return res.status(200).json({ status: "success", data: [] });
        }
        conditions.MSSV = { [Op.in]: studentIds };
      }

      // Lấy danh sách lịch học theo course
      const schedules = await SchedulePersistence.findAll({
        where: { courseId: id },
        raw: true,
      });

      const scheduleIds = schedules.map((s) => s.scheduleId);

      // Lấy toàn bộ điểm danh theo lịch học và điều kiện MSSV
      const attendances = await AttendancePersistence.findAll({
        where: {
          scheduleId: { [Op.in]: scheduleIds },
          ...conditions,
        },
        raw: true,
      });

      const studentIds = [...new Set(attendances.map((a) => a.MSSV))];

      // Lấy thông tin sinh viên và tạo map
      const students = await StudentPersistence.findAll({
        where: { MSSV: { [Op.in]: studentIds } },
        raw: true,
      });

      const studentMap = Object.fromEntries(students.map((s) => [s.MSSV, s]));
      const scheduleMap = Object.fromEntries(
        schedules.map((s) => [s.scheduleId, s])
      );

      // Xây dựng danh sách kết quả điểm danh
      const listResult = attendances.map((item) => {
        const student = studentMap[item.MSSV] || {};
        const schedule = scheduleMap[item.scheduleId] || {};

        return {
          name: student.fullName || "Unknown",
          MSSV: item.MSSV,
          dateAtt: schedule.dateSche || null,
          attended:
            item.attended === "FALSE" ? "Absent" : item.attended || "Present",
          scheduleId: item.scheduleId,
        };
      });

      // Tổng hợp dữ liệu trả về
      const data = {
        ...course,
        schedules, // đã lấy trước đó
        lecturer: await LecturerPersistence.findOne({
          where: { lecturerId: course.lecturerId },
          raw: true,
        }),
        room: await RoomPersistence.findOne({
          where: { roomId: course.roomId },
          raw: true,
        }),
        attendances: listResult,
      };

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { controller };
