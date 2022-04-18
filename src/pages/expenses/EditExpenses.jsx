import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, Select } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { editExpenses, getExpenseNames, getExpense } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const EditExpense = ({ editExpenses, getExpenseNames, getExpense }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const expense = useSelector((state) => state.expense.expense);

  useEffect(() => {
    const fetchData = async () => {
      await getExpense(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpense]);

  useEffect(() => {
    const fetchData = async () => {
      await getExpenseNames();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpenseNames]);

  const expenseNames = useSelector((state) => state.expense_name.expense_names);

  useEffect(() => {
    form.setFieldsValue({ name: expense.name });
    form.setFieldsValue({ amount: expense.amount });
  }, [expense]);

  const onFinish = async (values) => {
    await editExpenses(param?.id, values);
    navigate("/admin/show-expenses");
  };

  return (
    <>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px"
            }}
            size="large"
          >
            <Title style={{ textAlign: "center" }} level={3}>
              ကုန်ကျစရိတ်သွင်းရန်စာမျက်နှာ
            </Title>
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
              name="name"
              label="ကုန်ကျစရိတ်အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ရွေးပါ"
                }
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                
                {expenseNames.map((expense) => (
                  <Option value={expense.name} key={expense.id}>
                    {expense.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="ပမာဏ"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပမာဏထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ပမာဏထည့်ပါ"
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
    </>
  );
};

export default connect(null, { editExpenses, getExpenseNames, getExpense })(
  EditExpense
);
