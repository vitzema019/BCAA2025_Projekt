/**
 * @file getAbl.js
 * @description Application Business Logic (ABL) for retrieving a specific task by ID.
 *              Validates input, fetches the task, and appends its related order.
 */
const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const orderDao = require("../../dao/order-dao.js");

/**
 * JSON Schema for input validation.
 * - `id`: required string, exactly 32 characters long (task ID)
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
 * Handles retrieval of a single task by ID, including its related order.
 *
 * @async
 * @function GetAbl
 * @param {import("express").Request} req - Express request object (supports both `req.query` and `req.body`)
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and the task object (with attached order) on success,
 *   - 400 if input validation fails,
 *   - 404 if task is not found,
 *   - 500 on unexpected server error.
 */
async function GetAbl(req, res) {
  try {
    // Get request data from query or body
    const reqParams = req.query?.id ? req.query : req.body;

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
        message: `Task ${reqParams.id} not found`,
      });
      return;
    }

    // Attach related order
    const order = orderDao.get(task.orderId);
    task.order = order;

    // Respond with task data
    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
