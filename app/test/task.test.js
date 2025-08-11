import { jest } from '@jest/globals';
import { getAllTasks, getTaskById, createTask, modifyTaskById, deleteTaskById } from '../database/repository/Task.js';
import { models } from '../database/initDb.js';

const { Task } = models;

describe('Task Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset all mock data before each test
  });

test('getAllTasks should return all tasks', async () => {
  const fakeTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
  
  Task.findAll = jest.fn().mockResolvedValue(fakeTasks);
  Task.count = jest.fn().mockResolvedValue(2); // Add mock for count

  const result = await getAllTasks(1, 10); // Include pagination params if used

  expect(Task.findAll).toHaveBeenCalled();
  expect(result).toEqual({
    tasks: fakeTasks,
    totalTasks: 2,
    totalPages: 1,
    currentPage: 1
  });
});

  test('getTaskById should return a task by ID', async () => {
    const fakeTask = { id: 1, title: 'Single Task' };
    Task.findOne = jest.fn().mockResolvedValue(fakeTask);

    const result = await getTaskById(1);

    expect(Task.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(fakeTask);
  });

  test('createTask should create and return a task', async () => {
    const taskData = {
      title: 'New Task',
      description: 'Do something',
      status: 'pending',
      due_date: '2025-08-10'
    };
    const fakeCreated = { id: 3, ...taskData };

    Task.create = jest.fn().mockResolvedValue(fakeCreated);

    const result = await createTask(
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.due_date
    );

    expect(Task.create).toHaveBeenCalledWith(taskData);
    expect(result).toEqual(fakeCreated);
  });

test('modifyTaskById should update and return a task', async () => {
  const mockTask = {
    title: 'Old Title',
    description: 'Old Desc',
    status: 'pending',
    due_date: '2025-08-01',
    save: jest.fn().mockResolvedValue(true)
  };

  const updatedTask = await modifyTaskById({
    task: mockTask,
    newtitle: 'New Title',
    newdescription: 'New Desc',
    newstatus: 'completed',
    newdue_date: '2025-08-20'
  });

  expect(mockTask.title).toBe('New Title');
  expect(mockTask.description).toBe('New Desc');
  expect(mockTask.status).toBe('completed');
  expect(mockTask.due_date).toBe('2025-08-20');
  expect(mockTask.save).toHaveBeenCalled();
  expect(updatedTask).toEqual(mockTask);
});


  test('deleteTaskById should delete the task by ID', async () => {
    const taskId = 2;
    const mockTaskInstance = {
      destroy: jest.fn().mockResolvedValue()
    };

    Task.findOne = jest.fn().mockResolvedValue(mockTaskInstance);

    const result = await deleteTaskById(taskId);

    expect(Task.findOne).toHaveBeenCalledWith({ where: { id: taskId } });
    expect(mockTaskInstance.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test('deleteTaskById should return false if task not found', async () => {
    Task.findOne = jest.fn().mockResolvedValue(null);

    const result = await deleteTaskById(999);

    expect(Task.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(result).toBe(false);
  });
});
