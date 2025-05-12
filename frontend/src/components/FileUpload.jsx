import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ OnFileChange }) => {
  const Props = {
    beforeUpload: (file) => {
      OnFileChange(file);
      return false; // 阻止自动上传
    },
    showUploadList: false,
  };

  return (
    <Upload {...Props}>
      <Button icon={<UploadOutlined />}>选择文件</Button>
    </Upload>
  );
};

export default FileUpload; 
