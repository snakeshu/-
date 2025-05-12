const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ConvertFile } = require("../utils/FileConvertUtil");

const Router = express.Router();
const Upload = multer({ dest: "uploads/" });

Router.post("/", Upload.single("file"), async (req, res) => {
  const File = req.file;
  const TargetFormat = req.body.targetFormat;

  if (!File || !TargetFormat) {
    return res.status(400).json({ message: "参数缺失" });
  }

  try {
    const OutputPath = await ConvertFile(File.path, TargetFormat);
    res.download(OutputPath, `result.${TargetFormat}`, (err) => {
      fs.unlinkSync(File.path);
      fs.unlinkSync(OutputPath);
    });
  } catch (err) {
    console.error('文件转换出错：', err);
    res.status(500).json({ message: "文件转换失败" });
  }
});

module.exports = Router; 
