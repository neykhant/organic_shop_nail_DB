import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  notification,
  message,
  Alert
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  ExportOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getShops, deleteShops, getShop } from "../../store/actions";

const { Title } = Typography;

const ShowShops = ({ shop, getShops, deleteShops, getShop }) => {
  const navigate = useNavigate();

  const handleClick = async (record) => {
    await getShop(record.id);
    navigate(`/admin/edit-shops/${record.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Delete Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };

  const handleDelete = async (record) => {
    await deleteShops(record.id);
    openNotificationWithIcon("error");
  };

  const columns = [
    {
      title: "ဆိုင်အမည်",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      {(shop.error).length > 0 ? (
        <Alert
        message="Errors"
        description={shop.error}
        type="error"
        showIcon
        closable
      />
      ) : null}
{/* 
{shop.isSuccess && (
        <Alert
          message="Successfully!!!"
          description="Your data have been saved"
          type="success"
          showIcon
          closable
        />
      )} */}

      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ဆိုင်အမည်စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-shops")}
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
              စာရင်းထုတ်မည်
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={shop.shops}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, { getShops, deleteShops, getShop })(
  ShowShops
);
