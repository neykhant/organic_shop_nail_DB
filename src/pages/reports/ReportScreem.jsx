import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  DatePicker,
  Select,
  Input,
  Button,
} from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined } from "@ant-design/icons";
import queryString from "query-string";
import { getReport } from "../../store/actions";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;
const ReportScreem = () => {
  const [reportType, setReportType] = useState("1");
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const report = useSelector((state) => state.report.report);
  useEffect(() => {
    const fetchData = () => {
      dispatch(getReport(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getReport]);

  let columns = [];

  if (reportType === "1") {
    columns = [
      {
        title: "ဝန်ဆောင်မှုမှရငွေစုစုပေါင်း",
        dataIndex: "service_total",
      },
      {
        title: "ပစ္စည်းရောင်းရငွေစုစုပေါင်း",
        dataIndex: "item_total",
      },
      {
        title: "ဝင်ငွေစုစုပေါင်း",
        dataIndex: "sale_total",
      },
    ];
  } else {
    columns = [
      {
        title: "ဝန်ဆောင်မှုမှရငွေစုစုပေါင်း",
        dataIndex: "service_total",
      },
      {
        title: "ပစ္စည်းရောင်းရငွေစုစုပေါင်း",
        dataIndex: "item_total",
      },
      {
        title: "ဝင်ငွေစုစုပေါင်း",
        dataIndex: "sale_total",
      },
      {
        title: "ပစ္စည်းအရင်းစုစုပေါင်း",
        dataIndex: "item_buy_total",
      },
      {
        title: "ဝန်ထမ်းလစာစုစုပေါင်း",
        dataIndex: "staff_salary",
      },
      {
        title: "ကော်မရှင်စုစုပေါင်း",
        dataIndex: "totalCommision",
      },
      {
        title: "အထွေထွေကုန်ကျငွေစုစုပေါင်း",
        dataIndex: "expenseTotal",
      },
      {
        title: "အမြတ်စုစုပေါင်း",
        dataIndex: "profit",
      },
    ];
  }

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>Report Screen</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={(val) => {
                  window.location = `/admin/report-screem?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }}
              />
            </Space>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Input.Group compact style={{ width: "100%" }}>
              <Select
                showSearch
                placeholder="report အမျိုးအစားရွေးပါ"
                optionFilterProp="children"
                allowClear={true}
                onChange={(value) => setReportType(value)}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                <Option value="1">အရောင်းစာရင်းချုပ်</Option>
                <Option value="2">အရှံးအမြတ်စာရင်း</Option>
              </Select>
            </Input.Group>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
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
        <Table
          bordered
          columns={columns}
          pagination={{ position: ["none", "none"] }}
          dataSource={report}
        />
      </Space>
    </Layout>
  );
};

export default ReportScreem;
