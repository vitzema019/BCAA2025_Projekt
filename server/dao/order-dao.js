const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const orderFolderPath = path.join(__dirname, "storage", "orderList");

// Method to read an order from a file
function get(orderId) {
  try {
    const filePath = path.join(orderFolderPath, `${orderId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadOrder", order: error.order };
  }
}

// Method to write an order to a file
function create(order) {
  try {
    const orderList = list();
    if (orderList.some((item) => item.name === order.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists order with given name",
      };
    }
    order.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(orderFolderPath, `${order.id}.json`);
    const fileData = JSON.stringify(order);
    fs.writeFileSync(filePath, fileData, "utf8");
    return order;
  } catch (error) {
    throw { code: "failedToCreateOrder", order: error.order };
  }
}

// Method to remove an order from a file
function remove(orderId) {
  try {
    const filePath = path.join(orderFolderPath, `${orderId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveOrder", order: error.order };
  }
}

// Method to list orders in a folder
function list() {
  try {
    const files = fs.readdirSync(orderFolderPath);
    const orderList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(orderFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return orderList;
  } catch (error) {
    throw { code: "failedToListOrders", order: error.order };
  }
}

// get orderMap
function getOrderMap() {
  const orderMap = {};
  const orderList = list();
  orderList.forEach((order) => {
    orderMap[order.id] = order;
  });
  return orderMap;
}

module.exports = {
  get,
  create,
  remove,
  list,
  getOrderMap,
};
