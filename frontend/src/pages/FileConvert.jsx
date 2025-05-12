import React, { useState } from "react";
import { Card, Select, Button, Typography, message } from "antd";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import "./FileConvert.css";

const { Title } = Typography;
const { Option } = Select;

const FileConvert = () => {
  const [File, SetFile] = useState(null);
  const [TargetFormat, SetTargetFormat] = useState("");
  const [DownloadUrl, SetDownloadUrl] = useState("");

  const HandleFileChange = (file) => {
    console.log('选择的文件：', file);
    SetFile(file);
    SetDownloadUrl("");
  };

  const HandleFormatChange = (value) => {
    SetTargetFormat(value);
  };

  const HandleConvert = async () => {
    if (!File || !TargetFormat) {
      message.warning("请先选择文件和目标格式");
      return;
    }
    const FormDataObj = new FormData();
    FormDataObj.append("file", File);
    FormDataObj.append("targetFormat", TargetFormat);

    try {
      const Response = await axios.post("/api/file-convert", FormDataObj, {
        responseType: "blob",
      });
      const BlobUrl = window.URL.createObjectURL(new Blob([Response.data]));
      SetDownloadUrl(BlobUrl);
      message.success("转换成功！");
    } catch (error) {
      message.error("转换失败，请重试");
    }
  };

  return (
    <div className="file-convert-container">
      <Card className="file-convert-card">
        <Title level={3} style={{ color: "#4B3FE4" }}>文件转换</Title>
        <div className="file-upload-area">
          <FileUpload OnFileChange={HandleFileChange} />
          <span className="file-upload-tip">或将文件拖拽到此处</span>
        </div>
        <div className="format-select-area">
          <span>目标格式：</span>
          <Select
            style={{ width: 160 }}
            placeholder="请选择格式"
            onChange={HandleFormatChange}
          >
            <Option value="pdf">PDF</Option>
            <Option value="docx">DOCX</Option>
            <Option value="xlsx">XLSX</Option>
            <Option value="png">PNG</Option>
            <Option value="jpg">JPG</Option>
          </Select>
        </div>
        <Button
          type="primary"
          className="convert-btn"
          onClick={HandleConvert}
          disabled={!File || !TargetFormat}
        >
          开始转换
        </Button>
        {DownloadUrl && (
          <div className="download-area">
            <a href={DownloadUrl} download>
              点击下载转换结果
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FileConvert; 
