import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, DatePicker, Input, Select } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getVouchers } from "../../store/actions";

const { Title } = Typography;

const VoucherReports = ({ voucher, getVouchers}) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  console.log("vv",voucher.vouchers)


  useEffect(() => {
    const fetchData = async () => {
      await getVouchers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getVouchers]);

  const hell0 = voucher.vouchers;
  
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ဘောင်ချာကုတ်",
      dataIndex: "voucher_code"
    },

    {
      title: "ဝယ်သူအမည်",
      dataIndex: "buy_name"
    },
    {
      title: "ဝယ်ယူသောပမာဏ",
      dataIndex: "buy_amount"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ဘောင်ချာအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={3}>   
          </Col>
          <Col span={3}>    
          </Col>
        </Row>
        <Space direction="vertical" size={12}><RangePicker /></Space>
        
        <Row>
          <Col span={5}>
            <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
             SSort by ( ပမာဏ )
            </Button>
          </Col>
          <Col span={14}></Col>
          <Col span={5} >
            {/* <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
              ဝယ်ယူသူအမည်
            </Button> */}
            <Input.Group compact style={{ width: "100%" }}>
              <Select defaultValue="ဝယ်ယူသူအမည်">
                <Option value="Option1">ဝယ်ယူသူအမည်1</Option>
                <Option value="Option2">ဝယ်ယူသူအမည်2</Option>
              </Select>
            </Input.Group>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={voucher.vouchers}
        />
      </Space>
    </Layout>
  )
}

const mapStateToProps = (store) => ({
  voucher: store.voucher
});

export default connect(mapStateToProps, { getVouchers })(VoucherReports);