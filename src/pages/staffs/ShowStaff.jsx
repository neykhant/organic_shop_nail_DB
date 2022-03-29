import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffs, deleteStaffs } from "../../store/actions";
import { connect } from "react-redux";


const { Title } = Typography;

const ShowStaff = ({getStaffs, deleteStaffs}) => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staff.staffs);
  // console.log(staffs);
  useEffect(() => {
    const fetchData = async () => {
      await getStaffs();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStaffs]);

  const navigate = useNavigate();

  const handleClick = (record) => {
    // console.log("record", record.id);
    navigate(`/admin/edit-staff/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Delete Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  
  const handleDelete =async (record) => {
    await deleteStaffs(record.id);
    openNotificationWithIcon('error')
  }

  const columns = [
    {
      title: "ဓါတ်ပုံ",
      dataIndex: "image",
      render: (_, record) => (
        <img
        src={`${record.image}`}
          // alt="ပစ္စည်းပုံ"
          width={100}
          height={100}
        />
      )
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "အလုပ်စဝင်သောနေ့",
      dataIndex: "start_work"
    },
    {
      title: "ဖုန်းနံပါတ်",
      dataIndex: "phone"
    },
    {
      title: "လခ",
      dataIndex: "salary"
    },
    {
      title: "ဘဏ်အကောင့်",
      dataIndex: "bank_account"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>Edit</Button>
          <Button type="primary" danger onClick={ () =>handleDelete(record) }>
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
            <Title level={3}>ဝန်ထမ်းစာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-staff")}
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
          dataSource={staffs}
        />
      </Space>
    </Layout>
  )
}

export default connect(null, { getStaffs, deleteStaffs })(ShowStaff);