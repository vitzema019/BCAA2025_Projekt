/**
 * @file listAbl.js
 * @description Application Business Logic (ABL) for listing tasks.
 *              Optionally filters tasks by a specific order ID.
 */
const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
//const orderDao = require("../../dao/order-dao.js");

/**
 * JSON Schema for optional filtering input.
 * - `orderId`: optional string, exactly 32 characters long (used to filter tasks by order)
 */
const schema = {
  type: "object",
  properties: {
    orderId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: [],
  additionalProperties: false,
};

/**
 * Handles listing of tasks, optionally filtered by order ID.
 *
 * @async
 * @function ListAbl
 * @param {import("express").Request} req - Express request object (`req.query` or `req.body` can contain `orderId`)
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and an object containing `itemList` with tasks (filtered or all),
 *   - 400 if input validation fails,
 *   - 500 on unexpected server error.
 */
async function ListAbl(req, res) {
  try {
    const filter = req.query?.orderId ? req.query : (req.body || {});

    // Validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    let taskList;

    if (!filter.orderId) {
      taskList = taskDao.list();
    }
    else {
      // Retrieve filtered task list
      taskList = taskDao.listByOrderId(filter);
    }



    // Return result
    res.json({ itemList: taskList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
