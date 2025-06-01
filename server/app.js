/**
 * @file app.js
 * @description Main entry point of the Express.js server application.
 *              Registers routes for handling orders and tasks.
 */

const express = require("express");
const app = express();
const port = 8000;

const orderController = require("./controller/order");
const taskController = require("./controller/task");

/**
 * Middleware for parsing JSON request bodies.
 * @middleware
 */
app.use(express.json());

/**
 * Middleware for parsing URL-encoded request bodies.
 * @middleware
 */
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

/**
 * Basic GET endpoint to verify that the server is running.
 * @route GET /
 * @returns {string} - Text response "Hello World!"
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * Registers the order controller on the /order route.
 * @route /order
 */
app.use("/order", orderController);

/**
 * Registers the task controller on the /task route.
 * @route /task
 */
app.use("/task", taskController);

/**
 * Starts the server on the specified port.
 * @function
 * @listens {Server}
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
