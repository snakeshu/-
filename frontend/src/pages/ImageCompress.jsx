import React, { useState } from "react";
import { Card, Button, Typography, Slider, Select, message } from "antd";
import ImageUpload from "../components/ImageUpload";
import axios from "axios";
import "./ImageCompress.css";

const { Title } = Typography;
const { Option } = Select;

const ImageCompress = () => {
  const [Image, SetImage] = useState(null);
  const [Ratio, SetRatio] = useState(80); // 默认压缩比例80%
  const [Quality, SetQuality] = useState("high");
  const [DownloadUrl, SetDownloadUrl] = useState("");

  const HandleImageChange = (file) => {
    SetImage(file);
    SetDownloadUrl("");
  };

  const HandleRatioChange = (value) => {
    console.log('滑块值：', value);
    SetRatio(value);
  };

  const HandleQualityChange = (value) => {
    SetQuality(value);
    // 质量选择联动滑块
    if (value === "high") SetRatio(80);
    else if (value === "medium") SetRatio(60);
    else if (value === "low") SetRatio(40);
  };

  const HandleCompress = async () => {
    console.log('点击了开始压缩');
    if (!Image) {
      message.warning("请先选择图片");
      return;
    }
    const FormDataObj = new FormData();
    FormDataObj.append("image", Image);
    FormDataObj.append("ratio", Ratio);
    FormDataObj.append("quality", Quality);

    try {
      const Response = await axios.post("/api/image-compress", FormDataObj, {
        responseType: "blob",
      });
      const BlobUrl = window.URL.createObjectURL(new Blob([Response.data]));
      SetDownloadUrl(BlobUrl);
      message.success("压缩成功！");
    } catch (error) {
      message.error("压缩失败，请重试");
    }
  };

  return (
    <div className="image-compress-container">
      <Card className="image-compress-card">
        <Title level={3} style={{ color: "#4B3FE4" }}>图片压缩</Title>
        <div className="image-upload-area">
          <ImageUpload OnImageChange={HandleImageChange} />
          <span className="image-upload-tip">或将图片拖拽到此处</span>
        </div>
        <div className="compress-options">
          <span>压缩比例：</span>
          <Slider
            min={10}
            max={100}
            step={1}
            value={Ratio}
            onChange={HandleRatioChange}
            style={{ width: 180 }}
            tooltip={{ open: false }}
          />
          <span style={{ marginLeft: 8 }}>{Ratio}</span>
          <span style={{ marginLeft: 16 }}>质量：</span>
          <Select
            style={{ width: 100 }}
            value={Quality}
            onChange={HandleQualityChange}
          >
            <Option value="high">高</Option>
            <Option value="medium">中</Option>
            <Option value="low">低</Option>
          </Select>
        </div>
        <Button
          type="primary"
          className="compress-btn"
          onClick={HandleCompress}
          disabled={!Image}
        >
          开始压缩
        </Button>
        {DownloadUrl && (
          <div className="download-area">
            <a href={DownloadUrl} download>
              点击下载压缩图片
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageCompress; 
