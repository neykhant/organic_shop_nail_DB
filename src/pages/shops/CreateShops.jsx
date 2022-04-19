import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, message, Alert } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveShops, clearAlert } from "../../store/actions";
import store from "../../store";

const { Title } = Typography;

const CreateShops = ({ saveShops, shop, clearAlert }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    store.dispatch(clearAlert());
  }, []);

  // useEffect(() => {
  //   if (shop.isSuccess) {
  //     message.success("Successfully Created...");
  //   }
  // }, [shop.isSuccess]);

  // useEffect(() => {
  //   if (shop.error.length) {
  //     message.error(shop.error);
  //   }
  // }, [shop.error]);

  const onFinish = async (values) => {
    await saveShops(values);
    form.resetFields();
  };

  return (
    <Layout style={{ margin: "20px" }}>
      {shop.error.length > 0 ? (
        <Alert
          message="Errors"
          description={shop.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {shop.isSuccess && (
        <Alert
          message="Successfully Created"
          type="success"
          showIcon
          closable
        />
      )}
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ဆိုင်အမည်သွင်းခြင်းစာမျက်နှာ
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
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဆိုင်အမည်ထည့်ပါ"
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
  );
};

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, { saveShops, clearAlert })(CreateShops);
