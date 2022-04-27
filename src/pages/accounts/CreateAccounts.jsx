import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Select,
<<<<<<< HEAD
  notification,
  Spin,
  message
=======
  notification
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAccounts, getShops } from "../../store/actions";
import { connect } from "react-redux";
import { successCreateMessage } from "../../util/messages";

const { Title } = Typography;
const { Option } = Select;

const CreateAccounts = ({ saveAccounts, getShops }) => {
  const shops = useSelector((state) => state.shop.shops);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

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
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }

    return () => status.success;
  }, [status.success]);


  const [form] = Form.useForm();

<<<<<<< HEAD
=======
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Saved Your Data",
      description: "Your data have been saved.",
      duration: 3
    });
  };
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  const onFinish = async (values) => {
    await saveAccounts(values);
    form.resetFields();
    // navigate("/admin/show-accounts");
<<<<<<< HEAD
=======
    openNotificationWithIcon("success");
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  };

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အကောင့် ဖွင့်ခြင်း စာမျက်နှာ
        </Title>
        <Form
        colon={false}
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
            name="phone"
            label="ဖုန်းနံပါတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="ရာထူး"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ရာထူးရွေးပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ရာထူးရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              <Option value="manager">Manager</Option>
<<<<<<< HEAD
              <Option value="cashier">Cashier</Option>
=======
              <Option value="casher">Cashier</Option>
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
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
                <Option value={shop.id} key={shop.id}>
                  {shop.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
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
    </Spin>
  );
};

export default connect(null, { saveAccounts, getShops })(CreateAccounts);
