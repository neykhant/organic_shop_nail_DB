import React from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAccounts, deleteAccounts } from "../../store/actions";
import { ExportToExcel } from "../../excel/ExportToExcel";

const { Title } = Typography;

const ShowAccounts = ({ deleteAccounts }) => {
  const accounts = useSelector((state) => state.account.accounts);
  const fileName = "Accounts"; // here enter filename for your excel file
  const result = accounts.map((account) => ({
    name: account?.name,
    phone: account?.phone,
    position: account?.position,
    shop: account?.shop?.name
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Deleted Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };

  const handleDelete = async (record) => {
    await deleteAccounts(record.id);
    openNotificationWithIcon("success");
  };

  React.useEffect(() => {
    dispatch(getAccounts());
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
      render: (_, data) => data.shop?.name
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          {/* <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button> */}
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
            <ExportToExcel apiData={result} fileName={fileName} />
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

export default connect(null, { deleteAccounts })(ShowAccounts);
