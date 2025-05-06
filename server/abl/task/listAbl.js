const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
//const orderDao = require("../../dao/order-dao.js");

const schema = {
  type: "object",
  properties: {
    orderId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const filter = req.query?.orderId ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const taskList = taskDao.listByOrderId(filter);

    // return properly filled dtoOut
    res.json({ itemList: taskList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
