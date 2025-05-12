const express = require("express");
const FileConvert = require("../controllers/FileConvert");

const Router = express.Router();

Router.use("/file-convert", FileConvert);

module.exports = Router; 
