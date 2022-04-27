import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  notification,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { saveExpenseNames } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { successCreateMessage } from "../../util/messages";


const { Title } = Typography;

const CreateExpenseNames = ({ saveExpenseNames }) => {
  const [form] = Form.useForm();
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

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

  const onFinish = async (values) => {
    await saveExpenseNames(values);
    form.resetFields();
    // navigate("/admin/show-expense-names");
  };

  return (
<<<<<<< HEAD
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ကုန်ကျစရိတ်အမည် သွင်းခြင်း စာမျက်နှာ
          </Title>
          <Form
            colon={false}
            labelCol={{
              span: 3
            }}
            wrapperCol={{
              span: 24
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            form={form}
=======
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ကုန်ကျစရိတ်အမည် သွင်းခြင်း စာမျက်နှာ
        </Title>
        <Form
        colon={false}
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="name"
            label="ကုန်ကျစရိတ်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ထည့်ပါ",
              },
            ]}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
          >
            <Form.Item
              name="name"
              label="ကုန်ကျစရိတ်အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ကုန်ကျစရိတ်အမည်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
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

export default connect(null, { saveExpenseNames })(CreateExpenseNames);
