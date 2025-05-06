/**
 * @file listAbl.js
 * @description Application Business Logic (ABL) for listing all orders.
 *              Retrieves all stored orders and returns them as a list.
 */

const orderDao = require("../../dao/order-dao.js");

/**
 * Handles retrieval of all existing orders.
 *
 * @async
 * @function ListAbl
 * @param {import("express").Request} req - Express request object (not used in this handler)
 * @param {import("express").Response} res - Express response object
 * @returns {void} Responds with:
 *   - 200 and an object containing the list of orders under `itemList`,
 *   - 500 on unexpected server error.
 */
async function ListAbl(req, res) {
  try {
    const orderList = orderDao.list();
    res.json({ itemList: orderList });
  } catch (e) {
    res.status(500).json({ order: e.order });
  }
}

module.exports = ListAbl;
