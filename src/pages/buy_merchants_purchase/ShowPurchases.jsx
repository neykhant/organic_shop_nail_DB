import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Table,
  Row,
  Col
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import Text from "antd/lib/typography/Text";

const { Title } = Typography;
const ShowPurchases = ({
  getPurchase,
  purchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();
  const allPurchases = useSelector(
    (state) => state.purchase.purchase.purchase_credits
  );
  const allCredits = useSelector((state) => state.purchase.purchase);
  const getTotalCredit = useSelector((state) => state.purchase.purchases);
  // console.log(getTotalCredit);
  // console.log("one",allCredits.credit);

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

  const result = allPurchases?.map((purchase) => ({
    key: purchase.id,
    amount: purchase.amount,
    date: purchase.created_at,
    id: purchase.id
  }));

  let allCredit = [];
  result?.forEach((re) => allCredit.push(parseInt(re.amount)));
  const finalCredit = allCredit.reduce((a, b) => a + b, 0);
  // console.log("allCredit", allCredit);

  const onFinish = async (values) => {
    const result = {
      purchase_id: param.id,
      amount: values.amount
    };
    await savePurchaseCredits(result);
    form.resetFields();
    window.location.reload();
  };

  const handleDelete = async (record) => {
    await deletePurchaseCredits(record.id);
    window.location.reload();
  };
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date",
      render: (_, record) => getReadableDateDisplay(record.date)
    },
    {
      title: "ပေးခဲ့သည့်ငွေပမာဏ",
      dataIndex: "amount"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
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
<<<<<<< HEAD
          colon={false}
=======
        colon={false}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
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
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
<<<<<<< HEAD
              style={{
                width: "100%",
                justifyContent: "right",
                marginBottom: "10px"
              }}
=======
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
<<<<<<< HEAD
                  borderRadius: "5px"
=======
                  borderRadius: "5px",
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
                }}
              >
                ကနဦးပေးချေခဲ့သည့်ပမာဏ = {allCredits?.paid} Ks
              </Text>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
<<<<<<< HEAD
              style={{
                width: "100%",
                justifyContent: "right",
                marginBottom: "10px"
              }}
=======
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
              >
                ပေးချေခဲ့ပြီးပမာဏ = {finalCredit} Ks
              </Text>
            </Space>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
<<<<<<< HEAD
              style={{
                width: "100%",
                justifyContent: "right",
                marginBottom: "10px"
              }}
=======
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
              >
                ပေးရန်ကျန်ငွေ = {allCredits?.credit} Ks
              </Text>

              {/* <Title level={4}>ပေးရန်ကျန်ငွေ - </Title>
              <Title level={4}>{allCredits.credit} Ks</Title> */}
            </Space>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={result}
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
  savePurchaseCredits,
  deletePurchaseCredits
})(ShowPurchases);
