import React, { useState, useEffect } from "react";

// ant design styles
import {
  Layout,
  Row,
  Col,
  Select,
  Space,
  Typography,
  Input,
  Button,
  Image,
  Table,
  InputNumber,
  message
} from "antd";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  SaveOutlined,
  PrinterOutlined
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { connect } from "react-redux";
import {
  getStocks,
  getServices,
  getStaffs,
  getMembers
} from "../store/actions";
import { call } from "../services/api";

const { Header, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const Sale = ({
  stock,
  getStocks,
  service,
  getServices,
  staff,
  getStaffs,
  member,
  getMembers
}) => {
  const [sales, setSales] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [memberId, setMemberId] = useState();
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [payMethod, setPayMethod] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
      await getServices();
      await getStaffs();
      await getMembers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks, getServices, getStaffs, getMembers]);

  const handleAddSaleItem = (stock) => {
    const index = sales.findIndex(
      (sale) => sale.sale_id === stock.item.id && sale.is_item
    );
    if (index === -1) {
      const sale = {
        key: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        sale_id: stock.id,
        code: stock.item.code,
        name: stock.item.name,
        capital: stock.item.buy_price,
        price: stock.item.sale_price,
        quantity: 1,
        subtotal: stock.item.sale_price * 1,
        is_item: true,
        staff_id: 1 // not need staff id for item. so, we need to change api
      };

      setSales([...sales, sale]);
    } else {
      let cloneSales = [...sales];

      cloneSales[index] = {
        ...cloneSales[index],
        quantity: cloneSales[index].quantity + 1,
        subtotal: cloneSales[index].price * (cloneSales[index].quantity + 1)
      };
      setSales(cloneSales);
    }
  };

  const handleAddSaleService = (service) => {
    const index = sales.findIndex(
      (sale) => sale.sale_id === service.id && !sale.is_item
    );
    if (index === -1) {
      const sale = {
        key: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        sale_id: service.id,
        code: service.code,
        name: service.category,
        capital: 0,
        price: service.price,
        quantity: 1,
        subtotal: service.price * 1,
        is_item: false,
        staff_id: undefined
      };

      setSales([...sales, sale]);
    } else {
      let cloneSales = [...sales];

      cloneSales[index] = {
        ...cloneSales[index],
        quantity: cloneSales[index].quantity + 1,
        subtotal: cloneSales[index].price * (cloneSales[index].quantity + 1)
      };
      setSales(cloneSales);
    }
  };

  const handleDelete = (record) => {
    const filterSales = sales.filter((saleItem) => saleItem !== record);
    const transformSales = filterSales.map((saleItem, index) => {
      return {
        ...saleItem,
        id: index + 1,
        key: index + 1
      };
    });
    setSales(transformSales);
  };

  const handleQuantityOnChange = (value, record) => {
    const index = sales.findIndex((sale) => sale === record);
    let cloneSales = [...sales];

    cloneSales[index] = {
      ...cloneSales[index],
      quantity: value,
      subtotal: cloneSales[index].price * value
    };
    setSales(cloneSales);
  };

  const handleSaffOnChange = (value, record) => {
    const index = sales.findIndex((sale) => sale === record);
    let cloneSales = [...sales];

    cloneSales[index] = {
      ...cloneSales[index],
      staff_id: value
    };
    setSales(cloneSales);
  };

  const handleMemberOnChange = (value) => {
    // if(value === undefined){

    // }
    const findMember = member.members.find((member) => member.id === value);
    setCustomerName(findMember.name);
    setCustomerPhone(findMember.phone);
    setMemberId(findMember.id);
  };

  const salesTotal =
    sales.length > 0
      ? sales.map((sale) => sale.subtotal).reduce((a, b) => a + b)
      : 0;

  const discountAmount = salesTotal * (discount / 100);

  const finalTotal = salesTotal - discountAmount;

  const credit = finalTotal - paid;

  const handleSavedSale = async () => {
    let items = [];
    let itemBuyTotal = 0;
    let itemTotal = 0;
    if(sales.length === 0){
      message.error("ကျေးဇူးပြု၍အဝယ်ပစ္စည်းများထည့်ပါ");
    }else if(paid === 0){
      message.error("ကျေးဇူးပြု၍ပေးငွေထည့်ပါ");
    }else if(customerName === ""){
      message.error("ကျေးဇူးပြု၍ဝယ်ယူသူအမည်ထည့်ပါ");
    }else if(customerPhone ===  ""){
      message.error("ကျေးဇူးပြု၍ဝယ်ယူသူဖုန်းနံပါတ်ထည့်ပါ");
    }else if(payMethod === undefined ){
      message.error("ကျေးဇူးပြု၍ငွေချေရမည့်နည်းလမ်ထည့်ပါ");
    }else{
    sales.forEach((sale) => {
      if (sale.is_item) {
        itemBuyTotal += Number(sale.capital) * Number(sale.quantity);
        itemTotal += Number(sale.subtotal);
        items.push({
          stock_id: sale.sale_id,
          staff_id: sale.staff_id,
          price: sale.price,
          quantity: sale.quantity
        });
      }
    });

    let services = [];
    let serviceTotal = 0;

    sales.forEach((sale) => {
      if (!sale.is_item) {
        serviceTotal += Number(sale.subtotal);
        services.push({
          service_id: sale.sale_id,
          staff_id: sale.staff_id,
          price: sale.price,
          quantity: sale.quantity
        });
      }
    });

    let savedData = {
      date: "2022-03-28",
      items: items,
      services: services,
      item_buy_total: itemBuyTotal,
      item_total: itemTotal,
      service_total: serviceTotal,
      total: salesTotal,
      discount: discount,
      paid: paid,
      payment_method: payMethod,
      customer_name: customerName,
      customer_phone_no: customerPhone
    };

    if (memberId !== undefined) {
      savedData = {
        ...savedData,
        member_id: Number(memberId)
      };
    }

    // console.log("ss",savedData);
    // console.log("metosd",payMethod)
    const response = await call("post", "invoices", savedData);
    console.log("rr",response);
  }
  };

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
      title: "ဝန်ထမ်းအမည်",
      dataIndex: "staff_name",
      render: (_, record) =>
        !record.is_item ? (
          <Select
            showSearch
            placeholder="ဝန်ထမ်းရွေးပါ"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear={true}
            size="large"
            style={{ borderRadius: "10px" }}
            onChange={(value) => handleSaffOnChange(value, record)}
          >
            {staff.staffs.map((staff) => (
              <Option value={staff.id} key={staff.id}>
                {staff.name}
              </Option>
            ))}
          </Select>
        ) : null
    },
    {
      title: "ဈေးနှုန်း",
      dataIndex: "price",
      align: "right"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
      align: "right",
      render: (_, record) => (
        <InputNumber
          value={record.quantity}
          onChange={(value) => handleQuantityOnChange(value, record)}
          style={{
            width: "100px",
            backgroundColor: "var(--white-color)",
            color: "var(--black-color)"
          }}
        />
      )
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "subtotal",
      align: "right"
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </Button>
      )
    }
  ];

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
          အရောင်း‌ဘောင်ချာဖွင့်ခြင်း
        </Title>
      </Header>
      <Layout
        style={{
          marginBottom: "20px",
          backgroundColor: "var(--white-color)",
          padding: "10px"
        }}
      >
        <Row gutter={[16, 16]}>
          <Col
            xl={{
              span: 4
            }}
          >
            <Space>
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)"
                }}
              >
                Barcode
              </Text>
              <Input
                placeholder="Scan Item"
                size="large"
                style={{ width: "130px" }}
              />
            </Space>
          </Col>
          <Col xl={{ span: 10 }}></Col>
          <Col xl={{ span: 7 }}>
            <Space>
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)"
                }}
              >
                Member Name
              </Text>
              <Select
                showSearch
                placeholder="မန်ဘာအမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => handleMemberOnChange(value)}
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {member.members.map((member) => (
                  <Option value={member.id} key={member.id}>
                    {member.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xl={{ span: 3 }}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)"
              }}
              size="large"
            >
              <PlusSquareOutlined />
              New Member
            </Button>
          </Col>
        </Row>
      </Layout>
      <Row gutter={[12, 12]} style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <Text
            style={{
              backgroundColor: "var(--primary-color)",
               paddingTop: "10px",
               paddingRight: "45px",
               paddingBottom: "10px",
               paddingLeft: "45px",
              color: "var(--white-color)",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
              marginLeft: "33px",
            }}
          >
           Product
          </Text>
          <Text
            style={{
              backgroundColor: "var(--primary-color)",
              paddingTop: "10px",
               paddingRight: "45px",
               paddingBottom: "10px",
               paddingLeft: "45px",
              color: "var(--white-color)",
              marginLeft: "33px"
            }}
          >
           Service
          </Text>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Layout style={{ display: "flex", flexDirection: "row" }}>
        <Sider
          width={380}
          style={{
            backgroundColor: "var(--info-color)",
            padding: "20px",
            height: "520px",
            overflow: "auto"
          }}
        >
          <Row gutter={[12, 12]}>
            <Col span={12}>
              {stock.stocks.map((stock) => (
                <Col key={stock.id}>
                  <Space
                    direction="vertical"
                    style={{
                      width: "100%",
                      alignItems: "center",
                      backgroundColor: "var(--white-color)",
                      marginBottom: "12px"
                    }}
                    onClick={() => handleAddSaleItem(stock)}
                  >
                    <Text
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)",
                        padding: "0 10px"
                      }}
                    >
                      {stock.item.code}
                    </Text>
                    <Image width={130} preview={false} src={stock.item.image} />
                    <Text style={{ color: "var(--black-color)" }}>
                      {stock.item.name}
                    </Text>
                  </Space>
                </Col>
              ))}
            </Col>
            <Col span={12}>
              {service.services.map((service) => (
                <Col key={service.id}>
                  <Space
                    direction="vertical"
                    style={{
                      width: "100%",
                      alignItems: "center",
                      backgroundColor: "var(--white-color)",
                      marginBottom: "12px"
                    }}
                    onClick={() => handleAddSaleService(service)}
                  >
                    <Text
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)",
                        padding: "0 10px"
                      }}
                    >
                      {service.code}
                    </Text>
                    <Image
                      width={130}
                      preview={false}
                      src={`${window.location.origin}/image.png`}
                    />
                    <Text style={{ color: "var(--black-color)" }}>
                      {service.category}
                    </Text>
                  </Space>
                </Col>
              ))}
            </Col>
          </Row>
        </Sider>
        <Content
          style={{
            minHeight: "520px",
            backgroundColor: "var(--muted-color)"
          }}
        >
          <Layout>
            <Table
              bordered
              columns={columns}
              dataSource={sales}
              pagination={{ position: ["none", "none"] }}
            />
            <Row gutter={[16, 16]}>
              <Col span={15} style={{ textAlign: "right" }}>
                <Title level={5}>စုစုပေါင်း</Title>
              </Col>
              <Col span={3}></Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <Title level={5}>{salesTotal}</Title>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={15} style={{ textAlign: "right" }}>
                <Title level={5}>လျော့ဈေး</Title>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <InputNumber
                  min={0}
                  value={discount}
                  onChange={(value) => setDiscount(value)}
                  addonAfter="%"
                  style={{
                    width: "100px",
                    backgroundColor: "var(--white-color)",
                    color: "var(--black-color)"
                  }}
                />
              </Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <Title level={5}>{discountAmount}</Title>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={15} style={{ textAlign: "right" }}>
                <Title level={5}>ပေးချေရမည့်စုစုပေါင်း</Title>
              </Col>
              <Col span={3}></Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <Title level={5}>{finalTotal}</Title>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={15} style={{ textAlign: "right" }}>
                <Title level={5}>ပေးငွေ</Title>
              </Col>
              <Col span={3}></Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <Title level={5}>
                  <InputNumber
                    min={0}
                    value={paid}
                    onChange={(value) => setPaid(value)}
                    style={{
                      width: "100px",
                      backgroundColor: "var(--white-color)",
                      color: "var(--black-color)"
                    }}
                  />
                </Title>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={15} style={{ textAlign: "right" }}>
                <Title level={5}>ပေးရန်ကျန်ငွေ</Title>
              </Col>
              <Col span={3}></Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <Title level={5}>{credit}</Title>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col xl={{ span: 10 }}>
                <Space>
                  <Text
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "10px",
                      color: "var(--white-color)"
                    }}
                  >
                    ဝယ်ယူသူအမည်
                  </Text>
                  <Input
                    size="large"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </Space>
              </Col>
              <Col xl={{ span: 4 }}></Col>
              <Col xl={{ span: 10 }}>
                <Space>
                  <Text
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "10px",
                      color: "var(--white-color)"
                    }}
                  >
                    ဝယ်ယူသူဖုန်းနံပါတ်
                  </Text>
                  <Input
                    size="large"
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                  />
                </Space>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col xl={{ span: 20 }} style={{ textAlign: "right" }}>
                <Space direction="vertical">
                  <Text
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "10px",
                      color: "var(--white-color)"
                    }}
                  >
                    ငွေချေရမည့်နည်းလမ်း
                  </Text>
                  <Select
                    showSearch
                    placeholder="ငွေချေနည်းရွေးပါ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value) => setPayMethod(value)}
                    allowClear={true}
                    size="large"
                    style={{ borderRadius: "10px" }}
                  >
                    <Option value="Cash">Cash</Option>
                    <Option value="KBZ">KBZ</Option>
                    <Option value="AYA">AYA</Option>
                    <Option value="CB">CB</Option>
                  </Select>
                </Space>
              </Col>
              <Col xl={{ span: 4 }}></Col>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
              <Col span={10} style={{ textAlign: "center" }}>
                <Button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)"
                  }}
                  size="large"
                  onClick={handleSavedSale}
                >
                  <SaveOutlined />
                  Save
                </Button>
              </Col>
              <Col span={4}></Col>
              <Col span={10} style={{ textAlign: "center" }}>
                <Button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)"
                  }}
                  size="large"
                >
                  <PrinterOutlined />
                  Print
                </Button>
              </Col>
            </Row>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock,
  service: store.service,
  staff: store.staff,
  member: store.member
});

export default connect(mapStateToProps, {
  getStocks,
  getServices,
  getStaffs,
  getMembers
})(Sale);
