import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  message,
  notification,
  Alert,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveStaffs, clearAlertStaffs } from "../../store/actions";
import { connect } from "react-redux";
import store from "../../store";
import { successCreateMessage } from "../../util/messages";

const { Title, Text } = Typography;

const CreateStaff = ({ saveStaffs, clearAlertStaffs, staff }) => {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    store.dispatch(clearAlertStaffs());
  }, []);

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
    if (fileList.length === 0) {
      message.error("ကျေးဇူးပြု၍၀န်ထမ်:ပုံထည့်ပါ");
    }
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("dob", values.dob);
      formData.append("start_work", values.start_work);
      formData.append("phone", values.phone);
      formData.append("salary", values.salary);
      formData.append("bank_account", values.bank_account);
      formData.append("image", fileList[0].originFileObj);
      await saveStaffs(formData);
      form.resetFields();
      // openNotificationWithIcon("success");
      setFileList([]);
    }
  };

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      {/* {staff.error.length > 0 ? (
        <Alert
          message="Errors"
          description={staff.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {staff.isSuccess && (
        <Alert
          message="Successfully Created"
          type="success"
          showIcon
          closable
        />
      )} */}
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ၀န်ထမ်းစာရင်းသွင်းရန်စာမျက်နှာ
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
          <Space
            direction="vertical"
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            <InputUpload fileList={fileList} setFileList={setFileList} />
            <Text type="secondary">ကျေးဇူးပြု၍၀န်ထမ်းဓါတ်ပုံထည့်ပါ</Text>
          </Space>
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
            name="dob"
            label="မွေးသက္ကရာဇ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ မွေးသက္ကရာဇ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="မွေးသက္ကရာဇ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="start_work"
            label="အလုပ်စဝင်သောနေ့"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အလုပ်စဝင်သောနေ့ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အလုပ်စဝင်သောနေ့ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
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
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="salary"
            label="လခ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ လခထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="လခထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="bank_account"
            label="ဘဏ်အကောင့်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဘဏ်အကောင့်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဘဏ်အကောင့်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
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

const mapStateToProps = (store) => ({
  staff: store.staff
});


export default connect(mapStateToProps, { saveStaffs, clearAlertStaffs })(
  CreateStaff
);
