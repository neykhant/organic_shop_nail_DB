import React from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined,  DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getExpenses, deleteExpenses, getExpense } from "../../store/actions";
import { connect } from "react-redux";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
const { Title } = Typography;

const ShowExpenses = ({ expense, getExpenses, deleteExpenses, getExpense }) => {
  const navigate = useNavigate();
  const mountedRef = React.useRef(true);
  const getExpenseResult = async () => {
    if (!mountedRef.current) return null;
    try {
      const response = await getExpenses();
      const result = response.data;
      console.log(result);
      // setGetData(result);
    } catch (error) {
      // console.log(error.response);
    }
  };
  React.useEffect(() => {
    getExpenseResult();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleClick = async (record) => {
    await getExpense(record.id);
    navigate(`/admin/edit-expenses/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Deleted Your Data",
      description: "Your data have been deleted.",
      duration: 3,
    });
  };

  const handleDelete = async (record) => {
    await deleteExpenses(record.id);
    openNotificationWithIcon("error");
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "created_at",
      render: (_, record) => getReadableDateDisplay(record.created_at),
    },
    {
      title: "ကုန်ကျစရိတ်",
      dataIndex: "name",
    },
    {
      title: "စုစုပေါင်း",
      dataIndex: "amount",
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
      ),
    },
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ကုန်ကျစရိတ်စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => navigate("/admin/create-expenses")}
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
                borderRadius: "5px",
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
          dataSource={expense.expenses}
          rowKey={expense.expenses.key}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  expense: store.expense,
});

export default connect(mapStateToProps, {
  getExpenses,
  deleteExpenses,
  getExpense,
})(ShowExpenses);
