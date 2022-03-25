import React, { useEffect, useRef, useState } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getServices, deleteServices } from "../../store/actions";
import { connect } from "react-redux";

const { Title } = Typography;

const ShowService = ({ service, getServices, deleteServices }) => {
  const [getData, setGetData] = useState();
  const navigate = useNavigate();

  const mountedRef = React.useRef(true);
  const getShopYearly = async () => {
    if (!mountedRef.current) return null;
    try {
      const response = await getServices();
      const result = response.data;
      console.log(result)
      // setGetData(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  React.useEffect(() => {
    getShopYearly();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleClick = (record) => {
    navigate(`/admin/edit-service/${record.id}`);
  };

  const handleDelete = async (record) => {
    await deleteServices(record.id);
  };

  const columns = [
    {
      title: "ကုတ်",
      dataIndex: "code"
    },
    {
      title: "အမျိုးအစား",
      dataIndex: "category"
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "price"
    },
    {
      title: "ရာခိုင်နှုန်း",
      dataIndex: "percentage"
    },
    {
      title: "ကော်မရှင်",
      dataIndex: "commercial"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ဝန်ဆောင်မှုစာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-service")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Col>
          <Col span={4}>
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
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={service.services}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  service: store.service
});

export default connect(mapStateToProps, { getServices, deleteServices })(
  ShowService
);
