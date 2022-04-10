import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  InputNumber,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editStaffs } from "../../store/actions";
import { connect } from "react-redux";

const { Title, Text } = Typography;

const EditStaff = ({ editStaffs }) => {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const AllStaffs = useSelector((state) => state.staff.staffs);
  const currentStaff = AllStaffs.find((staff) => staff.id === parseInt(id));

  useEffect(() => {
    if (currentStaff) {
      form.setFieldsValue({ dob: currentStaff.dob });
      form.setFieldsValue({ name: currentStaff.name });
      form.setFieldsValue({ start_work: currentStaff.start_work });
      form.setFieldsValue({ phone: currentStaff.phone });
      form.setFieldsValue({ salary: currentStaff.salary });
      form.setFieldsValue({ bank_account: currentStaff.bank_account });
      setFileList([
        {
          uid: currentStaff.image.uid,
          name: currentStaff.image.name,
          status: "done",
          url: currentStaff.image
        }
      ]);
    }
  }, [currentStaff]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("ကျေးဇူးပြု၍၀န်ထမ်:ပုံထည့်ပါ");
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("dob", values.dob);
    formData.append("start_work", values.start_work);
    formData.append("phone", values.phone);
    formData.append("salary", values.salary);
    formData.append("bank_account", values.bank_account);
    if (fileList[0].status !== "done") {
      formData.append("image", fileList[0].originFileObj);
    }
    await editStaffs(id, formData);
    navigate("/admin/show-staff");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ၀န်ထမ်းစာရင်းးပြုပြင်ရန်စာမျက်နှာ
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
            format="DD/MM/YYYY"
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
  );
};

export default connect(null, { editStaffs })(EditStaff);
