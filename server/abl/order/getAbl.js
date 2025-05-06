/**
 * @file getAbl.js
 * @description Application Business Logic (ABL) for retrieving a specific order by ID.
 *              Validates input, fetches the order, and appends related tasks.
 */

const Ajv = require("ajv");
const ajv = new Ajv();
const orderDao = require("../../dao/order-dao.js");
const taskDao = require("../../dao/task-dao.js");

/**
 * JSON Schema for input validation.
 * - `id`: required string representing the order ID to retrieve
 */
const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

/**
 * Handles retrieval of a single order and its related tasks.
 *
 * @async
 * @function GetAbl
 * @param {import("express").Request} req - Express request object (supports both `req.query` and `req.body`)
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and the order object including its task list on success,
 *   - 400 if input validation fails,
 *   - 404 if the order is not found,
 *   - 500 on unexpected server error.
 */
async function GetAbl(req, res) {
  try {
    // Get request data from query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        order: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Fetch order by ID
    const order = orderDao.get(reqParams.id);
    if (!order) {
      res.status(404).json({
        code: "orderNotFound",
        order: `Order with id ${reqParams.id} not found`,
      });
      return;
    }

    // Append related tasks
    const taskList = taskDao.listByOrderId({ orderId: order.id });
    order.taskList = taskList;

    // Respond with order data
    res.json(order);
  } catch (e) {
    res.status(500).json({ order: e.order });
  }
}

module.exports = GetAbl;
