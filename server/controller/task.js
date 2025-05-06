/**
 * @file task.js
 * @description Express router for handling task-related operations.
 *              Provides endpoints to get, list, create, and delete tasks.
 */

const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/task/getAbl");
const ListAbl = require("../abl/task/listAbl");
const CreateAbl = require("../abl/task/createAbl");
const DeleteAbl = require("../abl/task/deleteAbl");

/**
 * GET /task/get
 * Retrieves a specific task based on query parameters (e.g., ID).
 * @route GET /task/get
 * @returns {object} - JSON object with the task data
 */
router.get("/get", GetAbl);

/**
 * GET /task/list
 * Returns a list of all tasks.
 * @route GET /task/list
 * @returns {object[]} - JSON array of task objects
 */
router.get("/list", ListAbl);

/**
 * POST /task/create
 * Creates a new task from provided data.
 * @route POST /task/create
 * @param {object} req.body - The task data to create
 * @returns {object} - The created task
 */
router.post("/create", CreateAbl);

/**
 * POST /task/delete
 * Deletes an existing task specified in the request body.
 * @route POST /task/delete
 * @param {object} req.body - Data identifying the task to delete
 * @returns {object} - Result of the deletion operation
 */
router.post("/delete", DeleteAbl);

module.exports = router;
