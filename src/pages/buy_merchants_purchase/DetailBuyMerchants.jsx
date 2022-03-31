import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Table,
  Row,
  Col
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import { getPurchase } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";

const { Title, Text } = Typography;
const { Option } = Select;

const DetailBuyMerchants = ({ getPurchase, purchase }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();
  const purchaseDetail = useSelector((state) => state.purchase.purchase);

  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase]);

  console.log("p", purchaseDetail);

  // ပေးချေပြီးပမာဏ	ပေးရန်ကျန်ငွေ

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: `created_at`
    },
    {
      title: "ကုန်သည်လုပ်ငန်းအမည်"
    },
    {
      title: "ပေးချေပြီးပမာဏ",
      dataIndex: "paid"
    },
    {
      title: "ပေးရန်ကျန်ငွေ",
      dataIndex: "credit"
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary"
          
          > <EditOutlined/></Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အကြွေးပေးချေရန်
        </Title>
        <Table
          bordered
          columns={columns}
          dataSource={purchase.purchase.purchase_credits}
          pagination={{ defaultPageSize: 10 }}
        />
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>စုစုပေါင်း</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Title level={4}>{purchaseDetail.whole_total} Ks</Title>
          </Col>
        </Row>
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>ပေးပြီးငွေ</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Title level={4}>{purchaseDetail.paid} Ks</Title>
          </Col>
        </Row>
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>ပေးရန်ကျန်ငွေ</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Title level={4}>
              {purchaseDetail.whole_total - purchaseDetail.paid} Ks
            </Title>
          </Col>
        </Row>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "right" }}
        >
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
              borderRadius: "10px"
            }}
            size="large"
          >
            <SaveOutlined />
            အကြွေးပေးရန်
          </Button>
        </Space>
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getPurchase
})(DetailBuyMerchants);
