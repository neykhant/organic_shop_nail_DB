import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Table,
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getPurchase,
  getPurchases,
  savePurchaseCredits
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const ShowPurchases = ({
  getPurchase,
  purchase,
  getPurchases,
  savePurchaseCredits
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
      await getPurchases();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase, getPurchases]);

  const onFinish = async (values) => {
    const result = {
      purchase_id: param.id,
      amount: values.amount
    };
    console.log(result);
    await savePurchaseCredits(result);
    form.resetFields();
  };

  const handleDelete = (record) => {
      console.log(record.id)
  }
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: `created_at`
    },
    {
      title: "ပေးခဲ့သသည့်ငွေပမာဏ",
      dataIndex: "amount"
    },
    {
        title: "Actions",
        dataIndex: "action",
        render: (_, record) => (
          <Space direction="horizontal">
            <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined/>
          </Button>
          </Space>
        )
      }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အကြွေးပေးချေရန်
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
            name="amount"
            label="ပေးချေမည့်ပမာဏ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပေးချေမည့်ပမာဏထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="ပေးချေမည့်ပမာဏထည့်ပါ"
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
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          columns={columns}
          dataSource={purchase.purchase.purchase_credits}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getPurchase,
  getPurchases,
  savePurchaseCredits
})(ShowPurchases);
