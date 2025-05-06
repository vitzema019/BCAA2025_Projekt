/**
 * @file order.js
 * @description Express router for handling order-related operations.
 *              Includes endpoints to get, list, create, and delete orders.
 */

const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/order/getAbl");
const ListAbl = require("../abl/order/listAbl");
const CreateAbl = require("../abl/order/createAbl");
const DeleteAbl = require("../abl/order/deleteAbl");

/**
 * GET /order/get
 * Retrieves a specific order based on query parameters (e.g., ID).
 * @route GET /order/get
 * @returns {object} - JSON object with the order data
 */
router.get("/get", GetAbl);

/**
 * GET /order/list
 * Returns a list of all orders.
 * @route GET /order/list
 * @returns {object[]} - JSON array of order objects
 */
router.get("/list", ListAbl);

/**
 * POST /order/create
 * Creates a new order from provided data.
 * @route POST /order/create
 * @param {object} req.body - The order data to create
 * @returns {object} - The created order
 */
router.post("/create", CreateAbl);

/**
 * POST /order/delete
 * Deletes an existing order specified in the request body.
 * @route POST /order/delete
 * @param {object} req.body - Data identifying the order to delete
 * @returns {object} - Result of the deletion operation
 */
router.post("/delete", DeleteAbl);

module.exports = router;
