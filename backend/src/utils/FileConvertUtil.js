const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

async function ConvertFile(InputPath, TargetFormat) {
  // 这里只做简单示例，实际可根据需求调用 soffice、ffmpeg、imagemagick 等
  const OutputPath = InputPath + "." + TargetFormat;
  // 示例：用 soffice 转换文档
  return new Promise((resolve, reject) => {
    exec(
      `soffice --headless --convert-to ${TargetFormat} --outdir ${path.dirname(
        InputPath
      )} ${InputPath}`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        // 假设输出文件名与输入文件名一致，只是后缀变了
        const OutputFile =
          InputPath.replace(/\.[^/.]+$/, "") + "." + TargetFormat;
        if (fs.existsSync(OutputFile)) {
          resolve(OutputFile);
        } else {
          reject(new Error("转换失败"));
        }
      }
    );
  });
}

module.exports = { ConvertFile }; 
