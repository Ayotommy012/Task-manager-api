import express from 'express';
import { 
    createTask, 
    getAllTasks,
    getTaskById,
    modifyTaskById,
    deleteTaskById } from './database/repository/Task.js';
import { createTaskSchema } from './input_validation/task.js';

const app = express();

app.use(express.json());
//get all tasks
// This endpoint retrieves all tasks from the database

app.get('/tasks', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await getAllTasks(page, limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Pagination error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//create a new task
// This endpoint creates a new task after validating the input
app.post('/task', async (req, res) => {
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    const { title, description, status, due_date } = value;
     try {
        const task = await createTask(title, description, status, due_date);
       return res.status(201).send(task);
    } catch (error) {
        console.log(error);
       return res.status(500).send(error);
    }
})

//get a specific task
app.get('/task/:id', async (req, res) => {
    const taskid = req.params.id;
    try {
        const task = await getTaskById(taskid);
        if(task){
           return res.status(200).json(task);
        }
       return res.status(404).send("task not found");
    } catch (error) {
        console.log(error);
       return res.status(500).send(error);
    }
})
app.put('/task/:id', async (req, res) => {
  const { error, value } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const { title, description, status, due_date } = value;
  const taskid = req.params.id;

  try {
    const task = await getTaskById(taskid);
    if (!task) {
      return res.status(404).send("task not found");
    }

    await modifyTaskById({
      task,
      newtitle: title,
      newdescription: description,
      newstatus: status,
      newdue_date: due_date
    });

    return res.status(200).json({ message: "task updated", id: taskid });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).send(error);
  }
});

// delete a specific task
app.delete('/task/:id', async (req, res) => {
  const taskid = req.params.id;

  try {
    const deleted = await deleteTaskById(taskid);
    if (!deleted) {
      return res.status(404).send("task not found");
    }

    return res.status(200).json({ message: "task deleted", id: taskid });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).send(error);
  }
});


export default app;

