const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const orderDao = require("../../dao/order-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    description: { type: "string", maxLength: 250 },
    deadline: { type: "string", format: "date" },
    orderId: { type: "string" },
  },
  required: ["name", "deadline", "orderId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // validate date
    if (new Date(task.deadline) <= new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `deadline must be future date or current date`,
        validationError: ajv.errors,
      });
      return;
    }

    // check if orderId exists
    const order = orderDao.get(task.orderId);

    if (!order) {
      res.status(400).json({
        code: "orderDoesNotExist",
        message: `order with id ${task.orderId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    // store task to persistent storage
    task = taskDao.create(task);
    task.order = order;

    // return properly filled dtoOut
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
