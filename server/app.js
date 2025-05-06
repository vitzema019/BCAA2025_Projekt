const express = require("express");
const app = express();
const port = 8888;

const orderController = require("./controller/order");
const taskController = require("./controller/task");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/order", orderController);
app.use("/task", taskController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
