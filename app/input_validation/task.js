import Joi from "joi";
const createTaskSchema = Joi.object({
    title: Joi.string().required(),description: Joi.string().required(),status: Joi.string().valid("pending", "in-progress", "completed").required(),due_date: Joi.date().optional()
});

export {createTaskSchema}