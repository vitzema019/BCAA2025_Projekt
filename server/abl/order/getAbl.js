const Ajv = require("ajv");
const ajv = new Ajv();
const orderDao = require("../../dao/order-dao.js");
const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
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

    // read order by given id
    const order = orderDao.get(reqParams.id);
    if (!order) {
      res.status(404).json({
        code: "orderNotFound",
        order: `Order with id ${reqParams.id} not found`,
      });
      return;
    }

    const taskList = taskDao.listByOrderId({ orderId: order.id });
    order.taskList = taskList;

    // return properly filled dtoOut
    res.json(order);
  } catch (e) {
    res.status(500).json({ order: e.order });
  }
}

module.exports = GetAbl;
