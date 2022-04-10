import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  Select
} from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getBestItem } from "../../store/actions";
import Text from "antd/lib/typography/Text";

const { Title } = Typography;
const { Option } = Select;

const ItemsReports = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state) => state.item.items);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestItem(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestItem, location]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant([]);
    } else {
      const filterBuyMerchant = items.filter((mer) => mer.id === value);
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

  let columns = [];

  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.id
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "invoice.created_at",
        render: (_, record) =>
          getReadableDateDisplay(record.invoice?.created_at)
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.item?.name
      },

      {
        title: "အရေအတွက်",
        dataIndex: "quantity"
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.price * record.quantity
      }
    ];
  } else {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.item_id
        // render: (_, record) => console.log(record)
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.item?.name
      },

      {
        title: "အရေအတွက်",
        dataIndex: "total_qty"
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "total_subtotal"
        // render: (_, record) => record?.stock?.item?.sale_price*record?.total_qty,
      }
    ];
  }

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ပစ္စည်းအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={3}></Col>
        </Row>
        <Space direction="vertical" size={12}></Space>

        <Row>
          <Col span={6}>
            <RangePicker
              onChange={(val) => {
                //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                if (queryString.parse(location.search).best) {
                  window.location = `/admin/item-report?best=true&start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                } else {
                  window.location = `/admin/item-report?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }
              }}
            />
          </Col>
          <Col span={12}>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                marginBottom: "10px"
              }}
              size="large"
            >
              <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
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
                {items.map((item) => (
                  <Option key={item.key} value={item.id}>
                    {item.item.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>

          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
              onClick={() => (window.location = "/admin/item-report?best=true")}
            >
              အရောင်းရဆုံပစ္စည်းများ
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={showBuyMerchant != null ? showBuyMerchant : items}
        />
      </Space>
    </Layout>
  );
};

export default ItemsReports;
