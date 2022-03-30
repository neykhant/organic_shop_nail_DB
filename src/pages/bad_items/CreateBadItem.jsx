import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Table,
  Row,
  Col,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { saveBadItems, getStocks } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";
const now = new Date();


const { Title, Text } = Typography;
const { Option } = Select;
const CreateBadItem = ({getStocks, saveBadItems }) => {
const stocks = useSelector((state) => state.stock.stocks)
const allStocks =stocks.map((stock) => {
  return {
    id: stock.id,
    name: stock.item.name
  }
})

// console.log(allStocks)
  const [bads, setBads] = useState([]);
  const [credit, setCredit] = useState(0);
  const [paid, setPaid] = useState(null);
  const [buyMerchant, setBuyMerchant] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
        await getStocks();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks]);

  const onFinish = (values) => {
    setBads([
      ...bads,
      {
        ...values,
        date: dateFormat(now, "mm/dd/yyyy"),
        key: bads.length + 1
      }
    ]);
    form.resetFields();
  };
  // console.log(bads)

  // const onChange = (value) => {
  //   if (value === undefined) {
  //     setBuyMerchant(null);
  //   } else {
  //     //   const filterBuyMerchant = merchant.merchants.find(
  //     //     (mer) => mer.id === value
  //     //   );
  //     //   setBuyMerchant(filterBuyMerchant);
  //   }
  // };

  const handleDelete = (record) => {
    const filterBads = bads.filter((bad) => bad !== record);
    setBads(filterBads);
  };

  const handleSave =async () => {
     if(bads.length === 0) {
      message.error("ကျေးဇူးပြု၍ Itemထည့်ပါ");
    }else {
      console.log({...bads});
      // await saveBadItems(bads);
    }
  };

  
  const columns = [
    {
      title: "ပစ္စည်းအမည်/ကုတ်",
      dataIndex: "stock_id"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger 
        onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ချို့ယွင်းချက်ရှိပစ္စည်းများ
        </Title>
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "10px"
          }}
          size="large"
        >
        </Space>

        <Form
          labelCol={{
            xl: {
              span: 3
            }
          }}
          wrapperCol={{
            span: 24
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="stock_id"
            label="ပစ္စည်းကုတ်/အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ရွေးပါ"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {allStocks.map((stock) => (
              <Option key={stock.id} value={stock.id}>
                {stock.name}
              </Option>
            ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="အရေအတွက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "10px"
              }}
              size="large"
              htmlType="submit"
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          columns={columns}
          dataSource={bads}
          pagination={{ position: ["none", "none"] }}
        />

        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "right" }}
        >
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
              borderRadius: "10px"
            }}
            size="large"
            onClick={handleSave}
          >
            <SaveOutlined />
            သိမ်းမည်
          </Button>
        </Space>
      </Space>
    </Layout>
  );
};

export default connect(null, { saveBadItems, getStocks })(CreateBadItem);
