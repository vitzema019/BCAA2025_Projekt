const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/task/getAbl");
const ListAbl = require("../abl/task/listAbl");
const CreateAbl = require("../abl/task/createAbl");
const DeleteAbl = require("../abl/task/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
