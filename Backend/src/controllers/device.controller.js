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
const { DevicePersistence } = require("../model/device");

const DeviceController = {
  create: catchAsync(async (req, res) => {
    try {
      const request = req.body;
      const data = {
        deviceId: request?.deviceId || generateShortCode(),
        status: req?.body?.status,
        roomId: req?.body?.roomId,
      };
      await DevicePersistence.create(data);

      res.status(200).json({ status: "success", data });
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error.message);
    }
  }),

  update: catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
      const existingUser = await DevicePersistence.findOne({
        where: {
          deviceId: id,
        },
      });
      if (!existingUser) throw new ApiError(400, "Thiết bị không  tồn tại");
      const data = {
        roomId: req?.body?.roomId,
        status: req?.body?.status,
      };
      await DevicePersistence.update(data, { where: { deviceId: id } });
      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  getList: catchAsync(async (req, res) => {
    try {
      let data = await DevicePersistence.findAll();

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  show: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);

      let data = await DevicePersistence.findOne({
        where: {
          deviceId: id,
        },
      });
      console.log(data);

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
  deleteMethod: catchAsync(async (req, res) => {
    try {
      // Fetch the corresponding record for the provided type and ID
      const { id } = req.params;

      let result = null;
      let data = await DevicePersistence.findOne({ where: { deviceId: id } });
      if (!data) throw new ApiError(404, `Device with ID ${id} not found`);
      result = await DevicePersistence.destroy({ where: { deviceId: id } });

      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { DeviceController };
