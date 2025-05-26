const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { AuthenticationPersistence } = require("../model/authentication");
const config = require("../config/config");
const { v4 } = require("uuid");
const { LecturerPersistence } = require("../model/lecturer");
const { AdminPersistence } = require("../model/admin");
const { ParentPersistence } = require("../model/parent");
const { StudentPersistence } = require("../model/student");
const { generateShortCode } = require("../utils/common");
const { sequelize } = require("../config/sequelize");
const { Op } = require("sequelize");

const UserController = {
  create: catchAsync(async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { type } = req.params;
      const request = req.body;
      if (!request?.email) throw new ApiError(400, "Email không được để trống");

      const allowedRoles = ["lecturer", "admin", "parent", "student"];
      if (!allowedRoles.includes(type?.toLowerCase())) {
        throw new ApiError(400, "Api không đúng định dạng");
      }

      const existingUser = await AuthenticationPersistence.findOne({
        where: { email: request.email },
      });
      if (existingUser) throw new ApiError(400, "Tài khoản đã tồn tại");

      const authenInfo = {
        authId: generateShortCode(),
        email: request.email,
        password: await bcrypt.hash(request.password, 10),
        role: type,
      };
      await AuthenticationPersistence.create(authenInfo, { transaction });

      let data = {
        email: request.email,
        fullName: request.fullName || request?.name,
        phoneNumber: request.phoneNumber,
        address: request.address,
        authId: authenInfo.authId,
      };

      switch (type) {
        case "lecturer":
          data = {
            ...data,
            lecturerId: request?.lecturerId || generateShortCode(),
          };
          await LecturerPersistence.create(data, { transaction });
          break;
        case "admin":
          data = { ...data, adminId: request?.adminId || generateShortCode() };
          await AdminPersistence.create(data, { transaction });
          break;
        case "parent":
          data = {
            ...data,
            parentId: request?.parentId || generateShortCode(),
          };
          await ParentPersistence.create(data, { transaction });
          break;
        case "student":
          data = {
            ...data,
            RFID: request?.RFID,
            parentId: request.parentId ?? null,
            MSSV: request?.MSSV || generateShortCode(5),
          };
          await StudentPersistence.create(data, { transaction });
          break;
      }

      await transaction.commit();
      res.status(200).json({ status: "success", data });
    } catch (error) {
      console.log(error);
      if (transaction) await transaction.rollback();
      throw new ApiError(400, error.message);
    }
  }),

  update: catchAsync(async (req, res) => {
    const transaction = await sequelize.transaction();
    const { type, id } = req.params;
    try {
      const request = req.body;

      // Validation
      if (!request?.email) throw new ApiError(400, "Email không được để trống");

      const allowedRoles = ["lecturer", "admin", "parent", "student"];
      if (!allowedRoles.includes(type?.toLowerCase())) {
        throw new ApiError(400, "Api không đúng định dạng");
      }

      // Check if the account already exists with the new email (excluding current record)
      const existingUser = await AuthenticationPersistence.findOne({
        where: {
          email: request.email,
          authId: { [Op.ne]: request?.authId }, // Exclude the current record by `id`
        },
      });
      console.log(existingUser);
      if (existingUser) throw new ApiError(400, "Tài khoản đã tồn tại");

      // Update AuthenticationPersistence
      const authenInfo = {
        email: request.email,
        ...(request.password && {
          password: await bcrypt.hash(request.password, 10),
        }), // Only update password if provided
      };
      await AuthenticationPersistence.update(authenInfo, {
        where: { authId: id },
        transaction,
      });

      let data = {
        email: request.email,
        fullName: request.fullName || request?.name,
        phoneNumber: request.phoneNumber,
        address: request.address,
      };

      let oldData = null;

      // Update specific role persistence
      switch (type) {
        case "lecturer":
          data = {
            ...data,
            lecturerId: request?.lecturerId || generateShortCode(),
          };
          await LecturerPersistence.update(data, {
            where: {
              lecturerId: id,
            },
            transaction,
          });
          break;
        case "admin":
          data = { ...data, adminId: request?.adminId || generateShortCode() };
          await AdminPersistence.update(data, {
            where: {
              adminId: id,
            },
            transaction,
          });
          break;
        case "parent":
          data = {
            ...data,
            parentId: request?.parentId || generateShortCode(),
          };
          await ParentPersistence.update(data, {
            where: {
              parentId: id,
            },
            transaction,
          });
          break;
        case "student":
          data = {
            ...data,
            RFID: request?.RFID,
            parentId: request.parentId,
            MSSV: request?.MSSV || generateShortCode(5),
          };
          await StudentPersistence.update(data, {
            where: {
              MSSV: id,
            },
            transaction,
          });
          break;
      }

      await transaction.commit();
      res.status(200).json({ status: "success", data });
    } catch (error) {
      console.error(error);
      if (transaction) await transaction.rollback();
      throw new ApiError(400, error.message);
    }
  }),

  getList: catchAsync(async (req, res) => {
    try {
      const { type } = req.params;
      const request = req.body;

      const allowedRoles = ["lecturer", "admin", "parent", "student"];
      if (!allowedRoles.includes(type?.toLowerCase())) {
        throw new ApiError(400, "Api không đúng định dạng");
      }

      let list = [];

      switch (type) {
        case "lecturer":
          list = await LecturerPersistence.findAll();
          break;
        case "admin":
          list = await AdminPersistence.findAll();
          break;
        case "parent":
          list = await ParentPersistence.findAll();
          break;
        case "student":
          list = await StudentPersistence.findAll();
          break;
      }

      let data = [];
      if (list?.length > 0) {
        for (let item of list) {
          let newObj = {
            ...item.dataValues,
            authentication: await AuthenticationPersistence.findOne({
              where: { authId: item.authId },
            }),
          };
          if (type == "student") {
            newObj.parent = await ParentPersistence.findOne({
              where: {
                parentId: item?.parentId,
              },
            });
          }
          if (type == "parent") {
            newObj.hasChild = await StudentPersistence.findOne({
              where: {
                parentId: item?.parentId,
              },
            });
          }
          data.push(newObj);
        }
      }

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  show: catchAsync(async (req, res) => {
    try {
      const { type, id } = req.params;

      const allowedRoles = ["lecturer", "admin", "parent", "student"];
      if (!allowedRoles.includes(type?.toLowerCase())) {
        throw new ApiError(400, "Api không đúng định dạng");
      }

      let list = null;

      switch (type) {
        case "lecturer":
          list = await LecturerPersistence.findOne({
            where: {
              lecturerId: id,
            },
          });
          break;
        case "admin":
          list = await AdminPersistence.findOne({
            where: {
              adminId: id,
            },
          });
          break;
        case "parent":
          list = await ParentPersistence.findOne({
            where: {
              parentId: id,
            },
          });
          break;
        case "student":
          list = await StudentPersistence.findOne({
            where: {
              MSSV: id,
            },
          });
          break;
      }

      let data = { ...list?.dataValues };
      if (data) {
        data = {
          ...data,
          authentication: await AuthenticationPersistence.findOne({
            where: { authId: data?.authId },
          }),
        };

        if (type == "student") {
          data.parent = await ParentPersistence.findOne({
            where: {
              parentId: data?.parentId,
            },
          });
        }
        if (type == "parent") {
          data.hasChild = await StudentPersistence.findOne({
            where: {
              parentId: data?.parentId,
            },
          });
        }
      }

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  deleteMethod: catchAsync(async (req, res) => {
    const { type, id } = req.params;
    const allowedRoles = ["lecturer", "admin", "parent", "student"];
    if (!allowedRoles.includes(type?.toLowerCase())) {
      throw new ApiError(400, "Api không đúng định dạng");
    }

    const transaction = await sequelize.transaction();
    let result = null;
    let authId = null;

    try {
      // Fetch the corresponding record for the provided type and ID
      let userData;

      switch (type) {
        case "lecturer":
          userData = await LecturerPersistence.findOne({
            where: { lecturerId: id },
            transaction,
          });
          if (!userData)
            throw new ApiError(404, `Lecturer with ID ${id} not found`);
          authId = userData.authId;
          result = await LecturerPersistence.destroy({
            where: { lecturerId: id },
            transaction,
          });
          break;
        case "admin":
          userData = await AdminPersistence.findOne({
            where: { adminId: id },
            transaction,
          });
          if (!userData)
            throw new ApiError(404, `Admin with ID ${id} not found`);
          authId = userData.authId;
          result = await AdminPersistence.destroy({
            where: { adminId: id },
            transaction,
          });
          break;
        case "parent":
          userData = await ParentPersistence.findOne({
            where: { parentId: id },
            transaction,
          });
          if (!userData)
            throw new ApiError(404, `Parent with ID ${id} not found`);
          authId = userData.authId;
          result = await ParentPersistence.destroy({
            where: { parentId: id },
            transaction,
          });
          break;
        case "student":
          userData = await StudentPersistence.findOne({
            where: { MSSV: id },
            transaction,
          });
          if (!userData)
            throw new ApiError(404, `Student with ID ${id} not found`);
          authId = userData.authId;
          result = await StudentPersistence.destroy({
            where: { MSSV: id },
            transaction,
          });
          break;
        default:
          throw new ApiError(400, "Role không hợp lệ");
      }

      // If no records are deleted, return an error
      if (result == 0) {
        throw new ApiError(404, `${type} with ID ${id} not found`);
      }

      // Now, delete the associated authentication record
      await AuthenticationPersistence.destroy({
        where: { authId: authId },
        transaction,
      });

      // Commit the transaction if everything goes well
      await transaction.commit();

      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      await transaction.rollback();
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { UserController };
