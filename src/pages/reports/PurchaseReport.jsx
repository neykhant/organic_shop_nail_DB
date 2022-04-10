import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Select,
  notification,
  DatePicker
} from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getPurchaseReport,
  getMerchants,
  getBestPurchase
} from "../../store/actions";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import queryString from "query-string";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const PurchaseReport = ({ getPurchaseReport, getMerchants }) => {
  const { RangePicker } = DatePicker;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchaseReport = useSelector((state) => state.purchase.purchaseReport);
  const showPurchase = useSelector((state) => state.purchase.purchases);
  const allMerchant = useSelector((state) => state.merchant.merchants);

  const result = purchaseReport.map((p) => ({
    company_name: p.merchant.company_name,
    date: p.merchant.created_at,
    whole_total: p.whole_total,
    key: p.merchant_id
  }));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getPurchaseReport();
  //     await getMerchants();
  //   };
  //   fetchData();
  //   return () => {
  //     fetchData();
  //   };
  // }, [getPurchaseReport, getMerchants]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestPurchase(queryString.parse(location.search)));
      await getMerchants();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestPurchase, location, getMerchants]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant([]);
    } else {
      const filterBuyMerchant = purchaseReport.filter(
        (mer) => mer.merchant.id === value
      );
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: `created_at`,
      //   render: (_, record) => console.log(record)
      render: (_, record) =>
        showBuyMerchant === null
          ? getReadableDateDisplay(record.date)
          : getReadableDateDisplay(record.merchant.created_at)
    },
    {
      title: "ကုန်သည်လုပ်ငန်းအမည်",
      dataIndex: "company_name",
      render: (_, record) =>
        showBuyMerchant === null
          ? record.company_name
          : record?.merchant?.company_name
    },
    {
      title: "စုစုပေါင်",
      dataIndex: "whole_total"
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>အဝယ်မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <RangePicker
              onChange={(val) => {
                // alert(dayjs(val[0]).format("YYYY-MM-DD"))
                if (queryString.parse(location.search).best) {
                  window.location = `/admin/purchase-report?best=true&start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                } else {
                  window.location = `/admin/purchase-report?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={14}>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                marginBottom: "10px"
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
                {allMerchant.map((mer) => (
                  <Option key={mer.id} value={mer.id}>
                    {mer.company_name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={showBuyMerchant != null ? showBuyMerchant : result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default connect(null, {
  getPurchaseReport,
  getMerchants,
  getBestPurchase
})(PurchaseReport);
