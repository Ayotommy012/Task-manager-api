import {Sequelize,DataTypes} from "sequelize";

import loadTask from "./models/task.js";

const sequelize = new Sequelize("Taskmanagerapp", "postgres", "Tomiwa8096", {
    host: "localhost",
    dialect: "postgres",
})

const Task  = loadTask(sequelize, DataTypes);
//create models
const models = { Task }

export {sequelize, models};
