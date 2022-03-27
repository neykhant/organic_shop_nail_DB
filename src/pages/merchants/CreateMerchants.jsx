import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, Select, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveMerchants, getShops } from "../../store/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const CreateMerchants = ({ saveMerchants, getShops }) => {
  const [form] = Form.useForm();
  const shops = useSelector((state) => state.shop.shops);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Saved Your Data',
      description: 'Your data have been saved.',
      duration: 3
    });
  };
  const onFinish = async (values) => {
    await saveMerchants(values)
    form.resetFields();
    openNotificationWithIcon('success')
    // navigate("/admin/show-merchants");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ကုန်သည်အချက်အလက်သွင်းရန်စာမျက်နှာ
        </Title>
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
            name="code"
            label="ကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="company_name"
            label="ကုမ္ပဏီအမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုမ္ပဏီအမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကုမ္ပဏီအမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="other"
            label="အခြားအချက်လက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အခြားအချက်လက်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အခြားအချက်လက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          {/* <Form.Item
            name="shop_id"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              }
            ]}
          >
            
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {shops.map((shop) => (
                <Option value={shop.id} key={shop.id}>{shop.name}</Option>
              ))}
              
            </Select>
          </Form.Item> */}
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px"
              }}
              size="large"
              htmlType="submit"
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default connect(null, { saveMerchants, getShops })(CreateMerchants);
