/**
 * @file createAbl.js
 * @description Application Business Logic (ABL) for creating an order.
 *              Validates the input data, stores the order using DAO,
 *              and returns the created order as a response.
 */

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const orderDao = require("../../dao/order-dao.js");

/**
 * JSON Schema for order validation.
 * - `name`: required string, max 100 characters
 * - `description`: optional string, max 250 characters
 * - `dateOfCreation`: required string in YYYY-MM-DD format
 */
const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    description: { type: "string", maxLength: 250 },
    dateOfCreation: { type: "string", format: "date" },
  },
  required: ["name", "dateOfCreation"],
  additionalProperties: false,
};

/**
 * Handles the creation of a new order.
 *
 * @async
 * @function CreateAbl
 * @param {import("express").Request} req - Express request object containing the order data in `req.body`
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and the created order on success,
 *   - 400 and validation or DAO error on input issues,
 *   - 500 on unexpected internal error.
 */
async function CreateAbl(req, res) {
  try {
    let order = req.body;

    // Validate input using AJV
    const valid = ajv.validate(schema, order);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        order: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    console.log(order.dateOfCreation);
    console.log(new Date(order.dateOfCreation).setHours(0, 0, 0, 0));
    console.log(new Date().setHours(0, 0, 0, 0));

    // Validate that the deadline is today or in the future
    if (
      new Date(order.dateOfCreation).setHours(0, 0, 0, 0) >
      new Date().setHours(0, 0, 0, 0)
    ) {
      res.status(400).json({
        code: "invalidDate",
        message: `deadline must be past date or current date`,
        validationError: ajv.errors,
      });
      return;
    }

    // Store order via DAO
    try {
      order = orderDao.create(order);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // Return created order
    res.json(order);
  } catch (e) {
    console.log(e);
    res.status(500).json({ order: e.order });
  }
}

module.exports = CreateAbl;
