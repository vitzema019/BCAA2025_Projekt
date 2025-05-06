/**
 * @file deleteAbl.js
 * @description Application Business Logic (ABL) for deleting a task.
 *              Validates input and removes the task from persistent storage.
 */
const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

/**
 * JSON Schema for input validation.
 * - `id`: required string, exactly 32 characters long (ID of the task to delete)
 */
const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

/**
 * Handles deletion of a task by ID.
 *
 * @async
 * @function DeleteAbl
 * @param {import("express").Request} req - Express request object containing task ID in `req.body`
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and empty object on success,
 *   - 400 if input validation fails,
 *   - 500 on unexpected server error.
 */
async function DeleteAbl(req, res) {
  try {
    // Extract input data
    const reqParams = req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Fetch task by ID
    const task = taskDao.get(reqParams.id);
    if (!task) {
      res.status(404).json({
        code: "taskNotFound",
        order: `Task with id ${reqParams.id} not found`,
      });
      return;
    }

    // Remove the task
    taskDao.remove(reqParams.id);

    // Respond with empty object
    res.json({ task });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
