import { models } from "../initDb.js";

const { Task } = models; // Extract actual model
const publicAttributes = { exclude: ["id"] };

// Get all tasks
// Get all tasks with pagination
const getAllTasks = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Task.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    totalTasks: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    tasks: rows,
  };
};

// Create a task
const createTask = async (title, description, status, due_date) => {
  return await Task.create({ title, description, status, due_date });
};

// Get task by ID
const getTaskById = async (id) => {
  return await Task.findOne({ where: { id } });
};

const modifyTaskById = async ({ 
  task, 
  newtitle, 
  newdescription, 
  newstatus,
  newdue_date 
}) => {
  task.title = newtitle;
  task.description = newdescription;
  task.status = newstatus;
  task.due_date = newdue_date;
  await task.save();
  return task;
};

const deleteTaskById = async (id) => {
  const task = await Task.findOne({ where: { id } });

  if (!task) {
    return false; // ← change this from 'null' to 'false'
  }

  await task.destroy();
  return true;
};

export { getAllTasks, createTask, getTaskById, modifyTaskById, deleteTaskById };
