import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  Table,
  message,
  Checkbox,
  Alert
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import {
  saveBadItems,
  getStocks,
  clearAlert,
  getBadItem,
  getItems,
  editBadItems
} from "../../store/actions";
import { connect, useSelector } from "react-redux";
import dateFormat from "dateformat";
import store from "../../store";
import { useNavigate, useParams } from "react-router-dom";

const now = new Date();

const { Title } = Typography;
const { Option } = Select;
const EditBadItem = ({
  getStocks,
  saveBadItems,
  clearAlert,
  bad_item,
  getBadItem,
  getItems,
  editBadItems
}) => {
  const stocks = useSelector((state) => state.stock.stocks);
  const badItems = useSelector((state) => state.bad_item.bad_item);
  const param = useParams();
  const navigate = useNavigate();
  const allStocks = stocks.map((stock) => {
    return {
      id: stock.id,
      name: stock.item.name
    };
  });

  const editBadItem = stocks.find(
    (stock) => stock?.id == badItems?.stock?.id
  );

  // console.log("all", stocks.id)
  // console.log("edit",editBadItem.id);
  // console.log("get", badItems.stock.id)
// console.log(editBadItem)

  useEffect(() => {
    form.setFieldsValue({ quantity: badItems?.quantity });
    form.setFieldsValue({ stock_id: editBadItem?.id });
    form.setFieldsValue({ is_sale: badItems?.is_sale });
  }, [badItems]);

  const [bads, setBads] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
      await getItems();
      await getBadItem(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks, getBadItem, getItems]);

  useEffect(() => {
    store.dispatch(clearAlert());
  }, []);

  const onFinish = async (values) => {
    const result = {
      ...values,
      date: dateFormat(now, "yyyy-mm-dd"),
      is_sale: values.is_sale == 0 ? 0 : 1
    };
    await editBadItems(param?.id, result);
    navigate("/admin/show-bad-item/")
  };

  return (
    <Layout style={{ margin: "20px" }}>
      {bad_item.error !== "" ? (
        <Alert
          message="Errors"
          description={bad_item.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {bad_item.isSuccess && (
        <Alert message="Successfully Created" type="success" showIcon />
      )}

      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ချို့ယွင်းချက်ရှိပစ္စည်းများပြုပြင်ရန်စာမျက်နှာ
        </Title>
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "10px"
          }}
          size="large"
        ></Space>

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
            name="stock_id"
            label="ပစ္စည်းကုတ်/အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {allStocks.map((stock) => (
                <Option key={stock.id} value={stock.id}>
                  {stock.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="အရေအတွက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="is_sale"
            valuePropName={
              parseInt(badItems?.is_sale) === 1 ? "checked" : "unchecked"
            }
            wrapperCol={{ offset: 3, span: 16 }}
          >
            <Checkbox>ရောင်းပြီးသားပစ္စည်းလာလဲခြင်းလား</Checkbox>
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
  bad_item: store.bad_item
});

export default connect(mapStateToProps, {
  saveBadItems,
  getStocks,
  clearAlert,
  getBadItem,
  getItems,
  editBadItems
})(EditBadItem);
