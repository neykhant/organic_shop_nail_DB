import React, { useEffect} from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined,  DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getExpenseNames, deleteExpenseNames, getExpenseName } from "../../store/actions";
import { connect } from "react-redux";
const { Title } = Typography;

const ShowExpenseNames = ({ expenseNames, getExpenseNames, deleteExpenseNames, getExpenseName }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await getExpenseNames();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpenseNames]);

  const handleClick =async (record) => {
    await getExpenseName(record.id)
    navigate(`/admin/edit-expense-names/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };

  const handleDelete = async (record) => {
    await deleteExpenseNames(record.id);
    openNotificationWithIcon('error')
  };

  const columns = [
    {
      title: "ကုန်ကျစရိတ်အမည်",
      dataIndex: "name"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" 
          onClick={() => handleClick(record)}
          > 
          <EditOutlined/></Button>
          <Button type="primary" danger
          onClick={ ()=> handleDelete(record)} >
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
          <Col span={18}>
            <Title level={3}>ကုန်ကျစရိတ်အမည်စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-expense-names")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Col>
          <Col span={3}>
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
          dataSource={expenseNames.expense_names}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  expenseNames: store.expense_name
});


export default connect(mapStateToProps, { getExpenseNames, deleteExpenseNames, getExpenseName })(ShowExpenseNames);
