/**
 * @file createAbl.js
 * @description Application Business Logic (ABL) for creating a new task.
 *              Validates input, ensures deadline is in the future,
 *              checks existence of related order, and stores the task.
 */
const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const orderDao = require("../../dao/order-dao.js");

/**
 * JSON Schema for task validation.
 * - `name`: required string (max 100 characters)
 * - `description`: optional string (max 250 characters)
 * - `deadline`: required date in YYYY-MM-DD format (must be today or future)
 * - `orderId`: required string (must refer to an existing order)
 */
const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    description: { type: "string", maxLength: 250 },
    deadline: { type: "string", format: "date" },
    orderId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["name", "deadline", "orderId"],
  additionalProperties: false,
};

/**
 * Handles creation of a new task assigned to an existing order.
 *
 * @async
 * @function CreateAbl
 * @param {import("express").Request} req - Express request object containing task data in `req.body`
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and the created task object on success (including the related order),
 *   - 400 on validation error, past deadline, or missing order,
 *   - 500 on unexpected server error.
 */
async function CreateAbl(req, res) {
  try {
    let task = req.body;

    // Validate input structure
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Validate that the deadline is today or in the future
    if (
      new Date(task.deadline).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      res.status(400).json({
        code: "invalidDate",
        message: `deadline must be future date or current date`,
        validationError: ajv.errors,
      });
      return;
    }

    // Check that the referenced order exists
    const order = orderDao.get(task.orderId);

    if (!order) {
      res.status(400).json({
        code: "orderDoesNotExist",
        message: `order with id ${task.orderId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    // Create task and attach order reference
    task = taskDao.create(task);
    task.order = order;

    // Return the created task
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
