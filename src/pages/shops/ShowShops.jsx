import React, { useEffect, useState } from "react";
import { Typography, Space, Row, Col, Button, Table, Alert } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  ExportOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  getShops,
  deleteShops,
  getShop,
  clearAlert
} from "../../store/actions";
import store from "../../store";
import { ExportToExcel } from "../../excel/ExportToExcel";

const { Title } = Typography;

const ShowShops = ({ shop, getShops, deleteShops, getShop, clearAlert }) => {
  const navigate = useNavigate();
  const fileName = "Shops";
  const shops = useSelector((state) => state.shop.shops);
  const result = shops.map((shop) => ({
    name: shop.name,
    id: shop.id
  }));

  // console.log(result);

  useEffect(() => {
    store.dispatch(clearAlert());
  }, []);

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

  const handleDelete = async (record) => {
    await deleteShops(record.id);
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
      {shop.error.length > 0 ? (
        <Alert
          message="Errors"
          description={shop.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {shop.isSuccess && (
        <Alert message="Successfully Deleted" type="success" showIcon />
      )}

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
            <ExportToExcel apiData={result} fileName={fileName} />
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

export default connect(mapStateToProps, {
  getShops,
  deleteShops,
  getShop,
  clearAlert
})(ShowShops);
