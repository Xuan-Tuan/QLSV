const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE || "",
  username: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
  define: {
    timestamps: false, // Disable timestamps globally
  },
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 60000,
  },
  logging: false,
});

module.exports = { sequelize };
