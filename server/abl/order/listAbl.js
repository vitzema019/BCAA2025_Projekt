const orderDao = require("../../dao/order-dao.js");

async function ListAbl(req, res) {
  try {
    const orderList = orderDao.list();
    res.json({ itemList: orderList });
  } catch (e) {
    res.status(500).json({ order: e.order });
  }
}

module.exports = ListAbl;
