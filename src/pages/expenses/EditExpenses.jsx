import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, Select, Spin, message } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { editExpenses, getExpenseNames, getExpense } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { successEditMessage } from "../../util/messages";


const { Title } = Typography;
const { Option } = Select;

const EditExpense = ({ editExpenses, getExpenseNames, getExpense }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const expenseNames = useSelector((state) => state.expense_name.expense_names);
  const expense = useSelector((state) => state.expense.expense);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

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

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage);
    }

    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    form.setFieldsValue({ name: expense.name });
    form.setFieldsValue({ amount: expense.amount });
  }, [expense]);

  const onFinish = async (values) => {
    await editExpenses(param?.id, values);
    navigate("/admin/show-expenses");
  };

  return (
    <Spin spinning={status.loading}>
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
              ????????????????????????????????????????????????????????????????????????????????????
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
              label="?????????????????????????????????????????????"
              rules={[
                {
                  required: true,
                  message: "????????????????????????????????? ???????????????????????????????????????????????????????????????"
                }
              ]}
            >
              <Select
                showSearch
                placeholder="????????????????????????????????? ???????????????????????????????????????????????????????????????"
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
              label="????????????"
              rules={[
                {
                  required: true,
                  message: "????????????????????????????????? ??????????????????????????????"
                }
              ]}
            >
              <Input
                placeholder="??????????????????????????????"
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
                ????????????????????????
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Layout>
    </Spin>
  );
};

export default connect(null, { editExpenses, getExpenseNames, getExpense })(
  EditExpense
);
