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
      const exist = await CoursePersistence.findOne({
        where: {
          courseId: request?.courseId,
        },
      });

      const data = {
        courseId: request?.courseId,
        nameCourse: request?.nameCourse || request.name,
        startDay: formattedDate(request?.startDay),
        numberWeek: request?.numberWeek || request?.week,
        startTime: validateTime(request?.startTime),
        onlineUrl: request?.onlineUrl || request?.onlineURL,
        endTime: validateTime(request?.endTime),
        lecturerId: request?.lecturerId || request?.lecturerID,
        roomId: request?.roomId || request?.roomID,
      };
      console.log("data---------?> ", data);
      if (exist) {
        throw new ApiError(400, "Mã môn học đã tồn tại");
      }
      // roomID: course.roomID,
      // 		lecturerID: course.lecturerID,
      // 		courseId: course.code,
      // 		name: course.name,
      // 		onlineURL: course.onlineURL,
      // 		startDay: formattedDate( course.startDay ),
      // 		week: course.week,
      // 		startTime: course.startTime,
      // 		endTime: course.endTime,
      // 		students: courseStudentList,
      await CoursePersistence.create(data, { transaction });
      const scheduleList = generateSchedule(data.startDay, data.numberWeek);
      const dataSchedules = [];
      if (scheduleList?.length > 0) {
        for (let e of scheduleList) {
          // Fetch students' course data
          let schedule = await SchedulePersistence.findOne({
            where: {
              courseId: data.courseId,
              dateSche: formattedDate(e?.date),
            },
          });

          let resultSche = schedule?.dataValues;

          if (!resultSche) {
            resultSche = {
              scheduleId: generateNumericShortCode(5, "SCH"),
              courseId: data.courseId,
              dateSche: formattedDate(e?.date),
            };
            await SchedulePersistence.create(resultSche, {
              transaction,
            });
            // dataSchedules.push(resultSche)
          }
          dataSchedules.push(resultSche);
        }
      }
      if (request?.students?.length > 0) {
        await Promise.all(
          request?.students.map(async (item) => {
            const studentCourse = await CourseStudentPersistence.findOne({
              where: {
                courseId: data.courseId,
                MSSV: item,
              },
            });
            if (!studentCourse) {
              await CourseStudentPersistence.create(
                {
                  csId: generateNumericShortCode(5, "CS"),
                  courseId: data.courseId,
                  MSSV: item,
                },
                { transaction }
              );
            }

            if (dataSchedules?.length > 0) {
              for (let resultSche of dataSchedules) {
                if (resultSche) {
                  const attendance = await AttendancePersistence.findOne({
                    where: {
                      courseID: data?.courseId,
                      MSSV: item,
                      scheduleId: resultSche?.scheduleId,
                    },
                  });
                  if (!attendance) {
                    await AttendancePersistence.create(
                      {
                        attendId: generateNumericShortCode(5, "ATT"),
                        courseId: data?.courseId,
                        MSSV: item,
                        attended: "FALSE", // FALSE: absent
                        scheduleId: resultSche?.scheduleId,
                      },
                      { transaction }
                    );
                  }
                }
              }
            }
          })
        );
      }
      await transaction.commit();
      res.status(200).json({ status: "success", data });
    } catch (error) {
      console.log(error);
      await transaction.rollback();

      throw new ApiError(400, error.message);
    }
  }),

  update: catchAsync(async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    console.log(id);
    try {
      const request = req.body;
      const existingUser = await CoursePersistence.findOne({
        where: {
          courseId: id,
        },
      });
      if (!existingUser) throw new ApiError(400, "Môn học không tồn tại");
      const data = {
        // courseId: request?.courseId ,
        nameCourse: request?.nameCourse || request.name,
        startDay: formattedDate(request?.startDay),
        numberWeek: request?.numberWeek || request?.week,
        startTime: validateTime(request?.startTime),
        onlineUrl: request?.onlineUrl || request?.onlineURL,
        endTime: validateTime(request?.endTime),
        lecturerId: request?.lecturerId || request?.lecturerID,
        roomId: request?.roomId || request?.roomID,
      };
      await CoursePersistence.update(data, { where: { courseId: id } });
      console.log(data);
      const scheduleList = generateSchedule(data.startDay, data.numberWeek);
      const dataSchedules = [];
      if (scheduleList?.length > 0) {
        for (let e of scheduleList) {
          // Fetch students' course data
          let schedule = await SchedulePersistence.findOne({
            where: {
              courseId: data.courseId,
              dateSche: formattedDate(e?.date),
            },
          });

          let resultSche = schedule?.dataValues;

          if (!resultSche) {
            resultSche = {
              scheduleId: generateNumericShortCode(5, "SCH"),
              courseId: data.courseId,
              dateSche: formattedDate(e?.date),
            };
            await SchedulePersistence.create(resultSche, {
              transaction,
            });
            // dataSchedules.push(resultSche)
          }
          dataSchedules.push(resultSche);
        }
      }
      if (request?.students?.length > 0) {
        await Promise.all(
          request?.students.map(async (item) => {
            const studentCourse = await CourseStudentPersistence.findOne({
              where: {
                courseId: data.courseId,
                MSSV: item,
              },
            });
            if (!studentCourse) {
              await CourseStudentPersistence.create(
                {
                  csId: generateNumericShortCode(5, "CS"),
                  courseId: data.courseId,
                  MSSV: item,
                },
                { transaction }
              );
            }

            if (dataSchedules?.length > 0) {
              for (let resultSche of dataSchedules) {
                if (resultSche) {
                  const attendance = await AttendancePersistence.findOne({
                    where: {
                      courseID: data?.courseId,
                      MSSV: item,
                      scheduleId: resultSche?.scheduleId,
                    },
                  });
                  if (!attendance) {
                    await AttendancePersistence.create(
                      {
                        attendId: generateNumericShortCode(5, "ATT"),
                        courseId: data?.courseId,
                        MSSV: item,
                        attended: "FALSE", // FALSE: absent
                        scheduleId: resultSche?.scheduleId,
                      },
                      { transaction }
                    );
                  }
                }
              }
            }
          })
        );
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
    console.log(id);
    try {
      const request = req.body;
      const existingUser = await CoursePersistence.findOne({
        where: {
          courseId: id,
        },
      });
      if (!existingUser) throw new ApiError(400, "Môn học không tồn tại");
      const data = {
        onlineUrl: request?.onlineUrl || request?.onlineURL,
      };
      await CoursePersistence.update(data, { where: { courseId: id } });

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  getList: catchAsync(async (req, res) => {
    try {
      let conditions = {};
      if (req?.query?.lecturerId) {
        conditions.lecturerId = req?.query?.lecturerId;
      }

      let courseIds = [];
      if (req?.query?.studentId) {
        let listStudentCouse = await CourseStudentPersistence.findAll({
          where: {
            MSSV: req?.query?.studentId,
          },
        });
        if (listStudentCouse?.length > 0) {
          for (let item of listStudentCouse) {
            let value = item?.dataValues;
            if (value) courseIds.push(value?.courseId);
          }
        } else {
          res.status(200).json({ status: "success", data: [] });
        }
      }
      if (req?.query?.parentId) {
        let listStudents = await StudentPersistence.findAll({
          where: {
            parentId: req?.query?.parentId,
          },
        });
        if (listStudents?.length > 0) {
          const studentsIds = listStudents?.map((item) => item?.MSSV);
          let listStudentCouse = await CourseStudentPersistence.findAll({
            where: {
              MSSV: {
                [Op.in]: studentsIds,
              },
            },
          });
          console.log(
            "listStudentCouse----------> ",
            studentsIds,
            listStudentCouse
          );
          if (listStudentCouse?.length > 0) {
            for (let item of listStudentCouse) {
              let value = item?.dataValues;
              if (value) courseIds.push(value?.courseId);
            }
          } else {
            return res.status(200).json({ status: "success", data: [] });
          }
        }
      }
      if (courseIds?.length > 0) {
        conditions = {
          ...conditions,
          courseId: {
            [Op.in]: courseIds,
          },
        };
      }
      let list = await CoursePersistence.findAll({
        where: { ...conditions },
      });
      let data = await Promise.all(
        list.map(async (item) => {
          // Fetch students' course data
          const studentsCourse = await CourseStudentPersistence.findAll({
            where: { courseId: item.courseId },
            attributes: ["MSSV"], // Fetch only the required field to optimize query
            raw: true,
          });

          // Extract student IDs
          const studentIds = studentsCourse?.map((e) => e?.MSSV);

          // Fetch student details if there are any IDs
          const students =
            studentIds?.length > 0
              ? await StudentPersistence.findAll({
                  where: {
                    MSSV: {
                      [Op.in]: studentIds,
                    },
                  },
                  raw: true, // Optimize: Fetch plain objects directly
                })
              : [];

          // Combine the original item with the fetched students
          return {
            ...item.dataValues,
            students,
            lecturer: await LecturerPersistence.findOne({
              where: {
                lecturerId: item.lecturerId,
              },
            }),
            room: await RoomPersistence.findOne({
              where: {
                roomId: item.roomId,
              },
            }),
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
      let data = await CoursePersistence.findOne({
        where: {
          courseId: id,
        },
      });

      if (data) {
        const studentsCourse = await CourseStudentPersistence.findAll({
          where: { courseId: data?.courseId },
        });
        const studentIds = studentsCourse?.map((e) => e?.MSSV);
        console.log("studentIds--------> ", studentIds, studentsCourse);
        const students =
          studentIds?.length > 0
            ? await StudentPersistence.findAll({
                where: {
                  MSSV: {
                    [Op.in]: studentIds,
                  },
                },
                raw: true, // Optimize: Fetch plain objects directly
              })
            : [];

        const studentData = [];
        const schedules = await SchedulePersistence.findAll({
          where: {
            courseId: data?.dataValues?.courseId,
          },
        });
        if (students?.length > 0) {
          for (let e of students) {
            studentData.push({
              name: e?.fullName,
              MSSV: e?.MSSV,
              id: e?.MSSV,
              attended: await AttendancePersistence.count({
                where: {
                  MSSV: e?.MSSV,
                  courseId: id,
                  attended: "Present",
                },
              }),
              total: schedules?.length,
            });
          }
        }

        data = {
          ...data?.dataValues,
          students: studentData,
          schedules,
          lecturer: await LecturerPersistence.findOne({
            where: {
              lecturerId: data?.lecturerId,
            },
          }),
          room: await RoomPersistence.findOne({
            where: {
              roomId: data.roomId,
            },
          }),
        };
      }
      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  deleteMethod: catchAsync(async (req, res) => {
    try {
      // Fetch the corresponding record for the provided type and ID
      const { id } = req.params;
      let data = await CoursePersistence.findOne({
        where: { courseId: id },
      });
      if (!data) throw new ApiError(405, `Course with ID ${id} not found`);
      await CoursePersistence.destroy({ where: { courseId: id } });
      let result1 = SchedulePersistence.destroy({
        where: { courseId: id },
      });
      let result2 = AttendancePersistence.destroy({
        where: { courseId: id },
      });
      CourseStudentPersistence.destroy({ where: { courseId: id } });
      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  getListAttendance: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const course = await CoursePersistence.findOne({
        where: {
          courseId: id,
        },
      });
      console.log(id);

      let data = null;
      if (course) {
        let conditions = {};
        if (req?.query?.studentId) {
          conditions = {
            MSSV: req?.query?.studentId,
          };
        } else if (req?.query?.parentId) {
          let listStudents = await StudentPersistence.findAll({
            where: {
              parentId: req?.query?.parentId,
            },
          });
          if (listStudents?.length > 0) {
            const studentsIds = listStudents?.map((item) => item?.MSSV);

            if (studentsIds?.length > 0) {
              conditions = {
                MSSV: {
                  [Op.in]: studentsIds,
                },
              };
            } else {
              return res.status(200).json({ status: "success", data: [] });
            }
          }
        }

        data = { ...course.dataValues };
        const listAtt = await AttendancePersistence.findAll({
          where: {
            courseId: id,
            ...conditions,
          },
        });
        let listResult = [];
        if (listAtt?.length > 0) {
          for (let item of listAtt) {
            let student = await StudentPersistence.findOne({
              where: {
                MSSV: item?.MSSV,
              },
            });
            let schedule = await SchedulePersistence.findOne({
              where: {
                scheduleId: item?.dataValues?.scheduleId,
              },
            });

            let checkTime = moment(course?.dataValues?.dateSche).isSameOrAfter(
              moment(moment().format("yyyy-MM-DD"))
            );

            if (student) {
              listResult.push({
                ...student?.dataValues,
                ...schedule?.dataValues,
                attended:
                  item?.dataValues?.attended == "FALSE"
                    ? "Absent"
                    : item?.dataValues?.attended || "Present",
              });
            }
          }
        }
        data = {
          ...data,
          schedules: await SchedulePersistence.findAll({
            where: {
              courseId: id,
            },
          }),
          lecturer: await LecturerPersistence.findOne({
            where: {
              lecturerId: data?.lecturerId,
            },
          }),
          room: await RoomPersistence.findOne({
            where: {
              roomId: data.roomId,
            },
          }),
          attendances: listResult?.map((e) => ({
            name: e?.fullName,
            MSSV: e?.MSSV,
            dateAtt: e?.dateSche,
            attended: e?.attended,
            scheduleId: e?.scheduleId,
          })),
        };
      }

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { controller };
