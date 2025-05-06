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

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

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

    // check there is no transaction related to given order
    const taskList = taskDao.listByOrderId({ orderId: reqParams.id });
    console.log(taskList);
    //Remeve all assigned tasks if cout is > 0
    if (taskList.length) {
      taskList.map((e) => {
        taskDao.remove(e.id);
      });
    }

    // remove transaction from persistant storage
    orderDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ order: e.order });
  }
}

module.exports = DeleteAbl;
