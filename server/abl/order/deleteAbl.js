/**
 * @file deleteAbl.js
 * @description Application Business Logic (ABL) for deleting an order.
 *              Validates the input, removes related tasks if any,
 *              and deletes the order from persistent storage.
 */

const Ajv = require("ajv");
const ajv = new Ajv();
const orderDao = require("../../dao/order-dao.js");
const taskDao = require("../../dao/task-dao.js");

/**
 * JSON Schema for input validation.
 * - `id`: required string representing the order ID to be deleted
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
 * Handles deletion of an order and its related tasks.
 *
 * @async
 * @function DeleteAbl
 * @param {import("express").Request} req - Express request object containing the order ID in `req.body`
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and empty JSON object on success,
 *   - 400 on validation error,
 *   - 500 on unexpected server error.
 *
 * @remarks
 * - If there are tasks assigned to the order, they will be removed before the order is deleted.
 */
async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

    // Validate input
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

    // Check and remove related tasks
    const taskList = taskDao.listByOrderId({ orderId: reqParams.id });
    console.log(taskList);
    //Remeve all assigned tasks if cout is > 0
    if (taskList.length) {
      taskList.map((e) => {
        taskDao.remove(e.id);
      });
    }
    order.taskList = taskList;
    // Remove the order
    orderDao.remove(reqParams.id);

    // Respond with empty object
    res.json({
      order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ order: e.order });
  }
}

module.exports = DeleteAbl;
