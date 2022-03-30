import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBadItems, deleteBadItems } from "../../store/actions";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";


const { Title } = Typography;

const ShowBadItem = ({getBadItems, deleteBadItems}) => {
  const badItems = useSelector((state) => state.bad_item.bad_items);
  // console.log(badItems);
  useEffect(() => {
    const fetchData = async () => {
      await getBadItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Delete Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  
  const handleDelete =async (record) => {
    console.log(record.id)
    await deleteBadItems(record.id);
    openNotificationWithIcon('error')
  }

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name",
      render: (_, record) => (record.stock.item.name)
    },
    {
      title: "	ပစ္စည်းကုတ်",
      dataIndex: "item_code",
      render: (_, record) => (record.stock.item.code)
    },
    {
      title: "	အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger
          onClick={() => handleDelete(record)}
          >
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
            <Title level={3}>ချို့ယွင်းချက်ရှိပစ္စည်:များစာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-bad-item")}
            >
              <PlusSquareOutlined />
              New
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={badItems}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default connect(null, { getBadItems, deleteBadItems })(ShowBadItem);
