import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, Select } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import { editMerchants, getShops } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const EditMerchants = ({ editMerchants, getShops }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const merchants = useSelector((state) => state.merchant.merchants);
  const currentMerchant = merchants.find((merchant) => merchant.id === parseInt(id));
  const currentId = parseInt(currentMerchant.shop_id);
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

  useEffect(() => {
    if (currentMerchant) {
      form.setFieldsValue({ code: currentMerchant.code });
      form.setFieldsValue({ name: currentMerchant.name });
      form.setFieldsValue({ company_name: currentMerchant.company_name });
      form.setFieldsValue({ other: currentMerchant.other });
    }
  }, [currentMerchant]);

  const onFinish = async (values) => {
    await editMerchants(id, values)
    form.resetFields();
    navigate("/admin/show-merchants");
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
            ["shop_id"]: currentId ,
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
              // defaultValue={currentId}
            >
              {shops.map((shop) => (
                <Option  value={shop.id} key={shop.id}>{shop.name}</Option>
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

export default connect(null, { editMerchants, getShops })(EditMerchants);
