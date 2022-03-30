import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined,  DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMembers, deleteMembers, getMember } from "../../store/actions";
import { connect } from "react-redux";

const { Title } = Typography;

const ShowMembers = ({ getMembers, deleteMembers, getMember }) => {
  const navigate = useNavigate();
  const members = useSelector((state) => state.member.members);

  const result = members.map((member) => ({
    id: member.id,
    key: member.id,
    code: member.code,
    name: member.name,
    phone: member.phone,
    address: member.address,
    points: "10"
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getMembers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMembers]);

  const handleClick =async (record) => {
    await getMember(record.id)
    navigate(`/admin/edit-members/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  const handleDelete = async (record) => {
    await deleteMembers(record.id);
    openNotificationWithIcon('error')
  };

  const handleDetail = (record) => {
    navigate(`/admin/detail-members/${record.id}`);
  }

  const columns = [
    {
      title: "မန်ဘာကုတ်",
      dataIndex: "code"
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ဖုန်းနံပါတ်",
      dataIndex: "phone"
    },
    {
      title: "နေရပ်လိပ်စာ",
      dataIndex: "address"
    },
    {
      title: "point စုစုပေါင်း",
      dataIndex: "points"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" 
          style={{ background: "green", borderColor: "yellow" }}
          onClick={() => handleDetail(record)}>
            Details
          </Button>
          <Button
            type="primary"
            onClick={() => handleClick(record)}
          >
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
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>Member စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-members")}
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
          dataSource={result}
          // rowKey={result.key}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default connect(null, { getMembers, deleteMembers, getMember })(ShowMembers);

