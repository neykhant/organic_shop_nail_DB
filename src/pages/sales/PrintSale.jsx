import React, { useState, useEffect, useRef } from "react";

// ant design styles
import { Layout, Row, Col, Typography, Button, Table } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { call } from "../../services/api";
import { getDate } from "../../uitls/convertToDate";

const { Header } = Layout;
const { Title } = Typography;

const PrintSale = () => {
  const componentRef = useRef();
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState();

  const param = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await call("get", `invoices/${param.id}`);

      if (response.status === "success") {
        const data = response.data;
        setSale(data);

        const transformSales = [];

        data.items.forEach((item) => {
          transformSales.push({
            key: transformSales.length + 1,
            id: transformSales.length + 1,
            code: item.stock.item.code,
            name: item.stock.item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          });
        });

        data.services.forEach((service) => {
          transformSales.push({
            key: transformSales.length + 1,
            id: transformSales.length + 1,
            code: service.service.code,
            name: service.service.category,
            price: service.price,
            quantity: service.quantity,
            subtotal: service.subtotal,
          });
        });

        setSales(transformSales);
      }
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [param]);

  const columns = [
    {
      title: "စဥ်",
      dataIndex: "id",
    },
    {
      title: "ကုတ်နံပါတ်",
      dataIndex: "code",
    },
    {
      title: "ပစ္စည်း/ဝန်ဆောင်မှုအမည်",
      dataIndex: "name",
    },
    {
      title: "ဈေးနှုန်း",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
      align: "right",
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "subtotal",
      align: "right",
    },
  ];

  if (!sale) {
    return (
      <Layout>
        <Header style={{ backgroundColor: "var(--primary-color)" }}>
          <Title
            style={{
              color: "var(--white-color)",
              textAlign: "center",
              marginTop: "13px",
            }}
            level={3}
          >
            Loading
          </Title>
        </Header>
      </Layout>
    );
  }

  const discountAmount = sale.total * (sale.discount / 100);

  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--primary-color)" }}>
        <Title
          style={{
            color: "var(--white-color)",
            textAlign: "center",
            marginTop: "13px",
          }}
          level={3}
        >
          အရောင်း‌ဘောင်ချာ print ထုတ်ခြင်း
        </Title>
      </Header>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
            }}
            size="large"
            onClick={handlePrint}
          >
            <PrinterOutlined />
            Print
          </Button>
        </Col>
      </Row>
      <div
        style={{ height: "1276px", width: "909px", margin: "30px 10px" }}
        ref={componentRef}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Title level={3}>Organic Nail Shop</Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>Date</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{getDate(sale.created_at)}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>Voucher Code</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.voucher_code}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>Customer Name</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.customer_name}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>Customer Phone No</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.customer_phone_no}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>Payment Method</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.payment_method}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>

        <Table
          bordered
          columns={columns}
          dataSource={sales}
          pagination={{ position: ["none", "none"] }}
          style={{ margin: "10px 20px" }}
        />
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>စုစုပေါင်း</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.total}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>လျော့ဈေး</Title>
          </Col>
          <Col span={3} style={{ textAlign: "left" }}>
            <Title level={5}>{sale.discount}%</Title>
          </Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{discountAmount}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးချေရမည့်စုစုပေါင်း</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.final_total}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးငွေ</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.paid}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးရန်ကျန်ငွေ</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.credit}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </Layout>
  );
};

export default PrintSale;
