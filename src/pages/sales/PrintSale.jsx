import React, { useState, useEffect, useRef } from "react";

// ant design styles
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Table,
  Image,
  Divider
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { call } from "../../services/api";
import { getDate } from "../../uitls/convertToDate";
import organic from "./images/organic.jpg";

const { Header } = Layout;
const { Title } = Typography;

const PrintSale = () => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState();

  const param = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
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
            subtotal: item.subtotal
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
            subtotal: service.subtotal
          });
        });

        setSales(transformSales);
        // console.log(transformSales);
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
      dataIndex: "id"
    },
    {
      title: "ကုတ်နံပါတ်",
      dataIndex: "code"
    },
    {
      title: "ပစ္စည်း/ဝန်ဆောင်မှုအမည်",
      dataIndex: "name"
    },
    {
      title: "ဈေးနှုန်း",
      dataIndex: "price",
      align: "right"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
      align: "right"
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "subtotal",
      align: "right"
    }
  ];

  if (!sale) {
    return (
      <Layout>
        <Header style={{ backgroundColor: "var(--primary-color)" }}>
          <Title
            style={{
              color: "var(--white-color)",
              textAlign: "center",
              marginTop: "13px"
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

  const handleDashboard = () => {
    navigate("/admin/sale");
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--primary-color)" }}>
        <Title
          style={{
            color: "var(--white-color)",
            textAlign: "center",
            marginTop: "13px"
          }}
          level={3}
        >
          အရောင်း‌ဘောင်ချာ print ထုတ်ခြင်း
        </Title>
      </Header>
      <Row>
        <Col span={10}></Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handlePrint}
          >
            <PrinterOutlined />
            Print
          </Button>
        </Col>
        <Col span={2}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handleDashboard}
          >
            Go To Sale
          </Button>
        </Col>
        <Col span={10}></Col>
      </Row>
      <div style={{ width: "909px", margin: "30px 0px" }} ref={componentRef}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}></Col>
          <Col
            className="gutter-row"
            span={12}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <Title level={2}>Organic Nail Shop</Title>
            <Image width={100} src={organic} />
          </Col>
          <Col className="gutter-row" span={6}></Col>
        </Row>

        <Row>
          <Col span={1}></Col>
          <Col span={11}>
            <Row>
              <Col span={5}>
                <Title level={5}>Mandalay:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>Organic Nail Shop</Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဆိုင်ခွဲ(၁):</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>အမှတ်(၁၈၂)၂၉လမ်း၊၇၉x၈၀ကြား</Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဖုန်းနံပါတ်:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>09793990086, 024066055</Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဆိုင်ခွဲ(၂):</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>
                  Block6,Unit15၊၇၃လမ်း၊သဇင်လမ်းနှင့်ငုရွှေဝါလမ်းကြား။မင်္ဂလာမန္တလေး
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဖုန်းနံပါတ်:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>09790888550</Title>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={5}>
                <Title level={5}>Yangon:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>Organic Nail Shop</Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဆိုင်ခွဲ(၁):</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>
                  အမှတ်(၃၇)၊ရှင်စောပုဘုရားလမ်း၊စမ်းချောင်းမြို့နယ်။
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဖုန်းနံပါတ်:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>01-539551,09-762408875</Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဆိုင်ခွဲ(၂):</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>
                  B1(56/57)၊တော်၀င်စင်တာ၊ပြည်လမ်း၊ဒဂုံမြို့နယ်။
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Title level={5}>ဖုန်းနံပါတ်:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={18}>
                <Title level={5}>
                  01-8600111(Ext:1156),09-262437532,09-400600366
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Divider
              style={{
                height: "2px",
                color: "gray",
                borderWidth: "0",
                backgroundColor: "gray"
              }}
            />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={10}></Col>
          <Col span={4}>
            <Title
              level={2}
              style={{
                marginBottom: "15px",
                marginTop: "1px",
                textAlign: "center"
              }}
            >
              Invoice{" "}
            </Title>
          </Col>
          <Col span={10}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={11}>
            <Row>
              <Col span={9}>
                <Title level={5}>Customer Phone:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5}>{sale.customer_phone_no}</Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5}>Customer Name:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5}>{sale.customer_name}</Title>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={9}>
                <Title level={5}>Date:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5}>{getDate(sale.created_at)}</Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5}>Voucher Code:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5}>{sale.voucher_code}</Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5}>Payment Method:</Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5}>{sale.payment_method}</Title>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={sales}
          // pagination={{ position: ["none", "none"] }}
          pagination={{ defaultPageSize: 20, position: ["none", "none"] }}
          style={{ margin: "10px 20px" }}
        />
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5}>စုစုပေါင်း</Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.total}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5}>လျော့ဈေး</Title>
          </Col>
          <Col span={1} style={{ textAlign: "left" }}>
            <Title level={5}>{sale.discount}%</Title>
          </Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{discountAmount}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးချေရမည့်စုစုပေါင်း</Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.final_total}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးငွေ</Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5}>{sale.paid}</Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5}>ပေးရန်ကျန်ငွေ</Title>
          </Col>
          <Col span={1}></Col>
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
