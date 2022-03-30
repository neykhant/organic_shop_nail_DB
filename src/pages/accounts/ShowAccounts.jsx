import React from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/actions";

const { Title } = Typography;

const ShowAccounts = () => {
  const accounts = useSelector((state) => state.account.accounts);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (record) => {
    // navigate(`/admin/edit-accounts/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  

  const handleDelete = (record) => {
    
    // dispatch({ type: "DELETE_ACCOUNTS", payload:record.id})
    // openNotificationWithIcon('error')
  }

  React.useEffect(() => {
    dispatch(getAccounts())
  }, [getAccounts]);


  const columns = [
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ရာထူး",
      dataIndex: "position"
    },
    {
      title: "ဆိုင်အမည်",
      dataIndex: "shop",
      render: (_, data) => data.shop.name,
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}><EditOutlined /></Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined />
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
            <Title level={3}>အကောင့်စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-accounts")}
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
          dataSource={accounts}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default ShowAccounts;
