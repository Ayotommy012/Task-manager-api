import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import loadTask from "./models/task.js";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

const Task = loadTask(sequelize, DataTypes);

// Create models
const models = { Task };

export { sequelize, models };
