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
const {
  generateShortCode,
  generateNumericShortCode,
} = require("../utils/common");
const { sequelize } = require("../config/sequelize");
const { Op } = require("sequelize");
const { RoomPersistence } = require("../model/room");

const RoomController = {
  create: catchAsync(async (req, res) => {
    try {
      const data = {
        roomId: generateNumericShortCode(3, "B"),
        nameRoom: req?.body?.name,
      };
      await RoomPersistence.create(data);

      res.status(200).json({ status: "success", data });
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error.message);
    }
  }),

  update: catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
      const existingUser = await RoomPersistence.findOne({
        where: {
          roomId: id,
        },
      });
      if (!existingUser) throw new ApiError(400, "Phòng học không  tồn tại");
      const data = {
        nameRoom: req?.body?.name,
      };
      await RoomPersistence.update(data, { where: { roomId: id } });
      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  getList: catchAsync(async (req, res) => {
    try {
      let data = await RoomPersistence.findAll();

      res.status(200).json({ status: "success", data });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),

  show: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      let data = await RoomPersistence.findOne({
        where: {
          roomId: id,
        },
      });

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
      let data = await RoomPersistence.findOne({ where: { roomId: id } });
      if (!data) throw new ApiError(404, `room with ID ${id} not found`);
      result = await RoomPersistence.destroy({ where: { roomId: id } });

      res.status(200).json({ status: "success", data: true });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }),
};

module.exports = { RoomController };
