const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const orderDao = require("../../dao/order-dao.js");

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

async function CreateAbl(req, res) {
  try {
    let order = req.body;

    // validate input
    const valid = ajv.validate(schema, order);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        order: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store order to a persistant storage
    try {
      order = orderDao.create(order);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(order);
  } catch (e) {
    console.log(e);
    res.status(500).json({ order: e.order });
  }
}

module.exports = CreateAbl;
