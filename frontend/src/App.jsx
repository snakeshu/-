import React from 'react';
import { Layout, Menu, Card, Row, Col, Typography } from 'antd';
import {
  FileOutlined,
  PictureOutlined,
  CompressOutlined,
  ScissorOutlined,
  BgColorsOutlined,
  SwapOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const features = [
  { key: 'file', icon: <FileOutlined />, title: '文件转换', desc: '多种文件格式互转', link: '#' },
  { key: 'process', icon: <PictureOutlined />, title: '图片处理', desc: '亮度、对比度、滤镜等', link: '#' },
  { key: 'compress', icon: <CompressOutlined />, title: '图片压缩', desc: '高效压缩图片体积', link: '#' },
  { key: 'crop', icon: <ScissorOutlined />, title: '图片裁剪', desc: '自定义裁剪图片区域', link: '#' },
  { key: 'watermark', icon: <BgColorsOutlined />, title: '图片水印', desc: '添加文字或图片水印', link: '#' },
  { key: 'format', icon: <SwapOutlined />, title: '图片格式转换', desc: '图片格式一键转换', link: '#' },
];

function App() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          <Menu.Item key="file" icon={<FileOutlined />}>文件转换</Menu.Item>
          <Menu.Item key="process" icon={<PictureOutlined />}>图片处理</Menu.Item>
          <Menu.Item key="compress" icon={<CompressOutlined />}>图片压缩</Menu.Item>
          <Menu.Item key="crop" icon={<ScissorOutlined />}>图片裁剪</Menu.Item>
          <Menu.Item key="watermark" icon={<BgColorsOutlined />}>图片水印</Menu.Item>
          <Menu.Item key="format" icon={<SwapOutlined />}>图片格式转换</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '40px 16px', maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: '#222' }}>
          欢迎使用常用工具网站！
        </Title>
        <Row gutter={[32, 32]} justify="center">
          {features.map(f => (
            <Col xs={24} sm={12} md={8} key={f.key}>
              <Card
                hoverable
                style={{ borderRadius: 12, minHeight: 180 }}
                cover={<div style={{ fontSize: 48, color: '#1677ff', textAlign: 'center', marginTop: 24 }}>{f.icon}</div>}
                bodyStyle={{ textAlign: 'center' }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>{f.title}</Title>
                <div style={{ color: '#888' }}>{f.desc}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
