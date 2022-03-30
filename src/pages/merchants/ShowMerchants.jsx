import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification, Alert } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getMerchants, deleteMerchants, getMerchant, clearAlertMerchant } from "../../store/actions";
import store from "../../store";



const { Title } = Typography;

const ShowMerchants = ({ merchant, getMerchants, deleteMerchants, getMerchant, clearAlertMerchant }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await getMerchants();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMerchants]);

  // console.log(merchant.isSuccess)

  useEffect(() => {
    store.dispatch(clearAlertMerchant());
  }, []);

  const handleClick =async (record) => {
    await getMerchant(record.id)
    navigate(`/admin/edit-merchants/${record.id}`);
  };

  const handleDelete = async (record) => {
    await deleteMerchants(record.id);
  };

  const columns = [
    {
      title: "ကုတ်",
      dataIndex: "code"
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ကုမ္ပဏီအမည်",
      dataIndex: "company_name"
    },
    {
      title: "အခြားအချက်လက်",
      dataIndex: "other"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
          <EditOutlined/>
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined/>
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      {merchant.error.length > 0 ? (
        <Alert
          message="Errors"
          description={merchant.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {merchant.isSuccess && (
        <Alert message="Successfully Deleted" type="success" showIcon />
      )}

      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ကုန်သည်စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-merchants")}
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
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={merchant.merchants}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  merchant: store.merchant
});

export default connect(mapStateToProps, { getMerchants, deleteMerchants, getMerchant, clearAlertMerchant })(
  ShowMerchants
);
