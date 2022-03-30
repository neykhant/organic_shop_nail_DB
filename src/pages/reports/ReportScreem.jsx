import React, { useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  DatePicker,
  Select,
  Input,
  InputNumber
} from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItems } from "../../store/actions";
import { Button } from "antd";

const { Title } = Typography;
const ReportScreem = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>Report Screen</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={3}></Col>
        </Row>
        <Row>
          <Col span={8}>
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Input.Group compact style={{ width: "100%" }}>
              <Select defaultValue="အမျိုးအစား">
                <Option value="Option1">အရောင်းစာရင်းချုပ်</Option>
                <Option value="Option2">အရှံးအမြတ်စာရင်း</Option>
              </Select>
            </Input.Group>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              အရောင်းစာရင်းချုပ်
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={18}></Col>
          <Col span={3}></Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button>
          </Col>
        </Row>
      </Space>
    </Layout>
  );
};


export default  ReportScreem;
