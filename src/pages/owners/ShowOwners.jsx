import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import dateFormat, { masks } from "dateformat";
import {
  saveOwners,
  getOwners,
  deleteOwners,
  getOwner
} from "../../store/actions";
import { connect, useSelector } from "react-redux";

const { Title } = Typography;

const ShowOwners = ({ getOwners, deleteOwners, getOwner }) => {
  const owners = useSelector((state) => state.owner.owners);
  useEffect(() => {
    const fetchData = async () => {
      await getOwners();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getOwners]);

  const now = new Date();
  const date = dateFormat(now, "mm/dd/yyyy");
  const navigate = useNavigate();

  const handleClick = async (id) => {
    await getOwner(id);
    navigate(`/admin/edit-owner/${id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Deleted Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };

  const handleDelete = async (record) => {
    await deleteOwners(record.id);
    openNotificationWithIcon("error");
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "created_at",
      render: (_, record) => getReadableDateDisplay(record.created_at)
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "name",
      render: (_, record) => record.stock.item.name
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "code",
      render: (_, record) => record.stock.item.code
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record.id)}>
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
          <Col span={20}>
            <Title level={3}>လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်း စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-owner")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={owners}
        />
      </Space>
    </Layout>
  );
};

export default connect(null, { saveOwners, getOwners, deleteOwners, getOwner })(
  ShowOwners
);
