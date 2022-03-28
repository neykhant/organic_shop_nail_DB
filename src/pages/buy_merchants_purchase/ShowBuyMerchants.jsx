import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, Select, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  getMerchants,
  getPurchases,
  deletePurchases,
} from "../../store/actions";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";

const { Title, Text } = Typography;
const { Option } = Select;

const ShowBuyMerchants = ({
  purchase,
  merchant,
  getMerchants,
  getPurchases,
  deletePurchases,
}) => {
  const navigate = useNavigate();
  const allPurchases = useSelector((state) => state.purchase.purchases);
  // const purchaseAll = purchase.purchases;

  const [myPurchase, setMyPurchase] = useState([]);
  useEffect(() => {
    setMyPurchase([...myPurchase, ...allPurchases]);
  }, []);

  let allCredit = [];
  allPurchases.forEach((purchase) => allCredit.push(parseInt(purchase.credit)));
  const finalCredit = allCredit.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const fetchData = async () => {
      await getMerchants();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMerchants]);

  useEffect(() => {
    const fetchData = async () => {
      await getPurchases();
    };
    fetchData();

    return () => {
      fetchData();
    };
  }, [getPurchases]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant([]);
    } else {
      const filterBuyMerchant = merchant.merchants.find(
        (mer) => mer.id === value
      );
      setshowBuyMerchant([filterBuyMerchant]);
      // let result = "";
      // const filterMerchant = showBuyMerchant.forEach((mer) => {
      //   // result.push(mer.company_name)
      //   console.log(mer)
      // })
    }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };

  const handleDelete = async (record) => {
     const filterMyPurchase = myPurchase.filter((purchase) => purchase.id !== record.id)
     setMyPurchase(filterMyPurchase)
    await deletePurchases(record.id);
    openNotificationWithIcon('error')
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: `created_at`,
      render:(_,record)=>getReadableDateDisplay(record.created_at)
    },
    {
      title: "ကုန်သည်လုပ်ငန်းအမည်",
      dataIndex: "company_name",
      render: (_, record) =>
        showBuyMerchant === null
          ? record.merchant.company_name
          : showBuyMerchant[0].company_name,
    },
    {
      title: "ပေးချေပြီးပမာဏ",
      dataIndex: "paid",
    },
    {
      title: "ပေးရန်ကျန်ငွေ",
      dataIndex: "credit",
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
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
            <Title level={3}>အဝယ်စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => navigate("/admin/create-buy-merchants")}
            >
              <PlusSquareOutlined />
              New
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
              Export
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15}>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              size="large"
            >
              <Text type="secondary">ကုန်သည်လုပ်ငန်းအမည်ရွေးပါ</Text>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ကုန်သည်လုပ်ငန်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {merchant.merchants.map((mer) => (
                  <Option key={mer.id} value={mer.id}>
                    {mer.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col span={9}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
              size="large"
            >
              <Title level={4}>ပေးရန်ကျန်ငွေစုစုပေါင်း - </Title>
              <Title level={4}>{finalCredit} Ks</Title>
            </Space>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          // dataSource={showBuyMerchant === null ? allPurchases : showBuyMerchant}
          dataSource={allPurchases}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  purchase: store.purchase,
});

export default connect(mapStateToProps, {
  getMerchants,
  getPurchases,
  deletePurchases,
})(ShowBuyMerchants);
