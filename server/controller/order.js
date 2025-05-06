const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/order/getAbl");
const ListAbl = require("../abl/order/listAbl");
const CreateAbl = require("../abl/order/createAbl");
const DeleteAbl = require("../abl/order/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
