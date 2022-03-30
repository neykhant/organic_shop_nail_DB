import React, { useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
// ant design styles
import { Layout, Menu, Avatar, Space, Popover, Button } from "antd";
import Title from "antd/lib/typography/Title";

// ant design icons
import {
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  SaveOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  CalculatorOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  FileImageOutlined,
  ContactsOutlined,
  FolderAddOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import Dashboard from "../pages/Dashboard";
import SubMenu from "antd/lib/menu/SubMenu";
import CreateMerchants from "../pages/merchants/CreateMerchants";
import ShowMerchants from "../pages/merchants/ShowMerchants";
import CreateMembers from "../pages/members/CreateMembers";
import ShowMembers from "../pages/members/ShowMembers";
import CreateItems from "../pages/items/CreateItems";
import ShowItems from "../pages/items/ShowItems";
import CreateBuyMerchants from "../pages/buy_merchants_purchase/CreateBuyMerchants";
import ShowBuyMerchants from "../pages/buy_merchants_purchase/ShowBuyMerchants";
import CreateExpenses from "../pages/expenses/CreateExpenses";
import ShowExpenses from "../pages/expenses/ShowExpenses";
import CreateExpenseNames from "../pages/expense_names/CreateExpenseNames";
import ShowExpenseNames from "../pages/expense_names/ShowExpenseNames";
import CreateShops from "../pages/shops/CreateShops";
import ShowShops from "../pages/shops/ShowShops";
import CreateAccounts from "../pages/accounts/CreateAccounts";
import ShowAccounts from "../pages/accounts/ShowAccounts";
import CreateBuyItems from "../pages/buy_items/CreateBuyItems";
import ShowBuyItems from "../pages/buy_items/ShowBuyItems";
import ShowStocks from "../pages/stocks/ShowStocks";
import CreateSupplier from "../pages/supplier/CreateSupplier";
import ShowSupplier from "../pages/supplier/ShowSupplier";
import CreateStock from "../pages/stocks/CreateStock";
import CreateItemTransfer from "../pages/items_transfer/CreateItemTransfer";
import ShowItemTransfer from "../pages/items_transfer/ShowItemTransfer";
import ShowItemChangeList from "../pages/items_transfer/ShowItemChangeList";
import CreateBadItem from "../pages/bad_items/CreateBadItem";
import ShowBadItem from "../pages/bad_items/ShowBadItem";
import CreateStaff from "../pages/staffs/CreateStaff";
import ShowStaff from "../pages/staffs/ShowStaff";
import CreateService from "../pages/services/CreateService";
import ShowService from "../pages/services/ShowService";
import StaffComession from "../pages/staffs/StaffComession";
import DetailMembers from "../pages/members/DetailMembers";
import CreateOwners from "../pages/owners/CreateOwners";
import ShowOwners from "../pages/owners/ShowOwners";
import ItemsReports from "../pages/reports/ItemsReports";
import VoucherReports from "../pages/reports/VoucherReports";
import ServicesReport from "../pages/reports/ServicesReport";
import ReportScreem from "../pages/reports/ReportScreem";
import EditItems from "../pages/items/EditItems";
import EditSupplier from "../pages/supplier/EditSupplier";
import EditMembers from "../pages/members/EditMembers";
import EditService from "../pages/services/EditService";
import EditStaff from "../pages/staffs/EditStaff";
import EditShops from "../pages/shops/EditShops";
import EditOwners from "../pages/owners/EditOwners";
import EditAccounts from "../pages/accounts/EditAccounts";
import { logout } from "../store/actions";
import { connect, useSelector } from "react-redux";
import EditExpenseNames from "../pages/expense_names/EditExpenseNames";
import EditMerchants from "../pages/merchants/EditMerchants";
import EditExpenses from "../pages/expenses/EditExpenses";
import EditBuyMerchants from "../pages/buy_merchants_purchase/EditBuyMerchants";

const { Header, Footer, Sider, Content } = Layout;

const text = (
  <Title level={4} style={{ textAlign: "center" }}>
    Profile
  </Title>
);

const Admin = ({ logout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("jwtToken")
    navigate("/auth/login", { replace: true });
  };

  const content = (
    <Space direction="vertical" style={{ textAlign: "center", width: "100%" }}>
      <Title level={5}>
        {user?.name} ({user?.position})
      </Title>
      <Title level={5}>{user?.shop?.name}</Title>
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </Space>
  );

  let selectedKey;
  switch (pathname) {
    case "/admin/dashboard":
      selectedKey = "Dashboard";
      break;
    case "/admin/create-accounts":
      selectedKey = "CreateAccounts";
      break;
    case "/admin/show-accounts":
      selectedKey = "ShowAccounts";
      break;
    case "/admin/create-merchants":
      selectedKey = "CreateMerchants";
      break;

    case "/admin/show-merchants":
      selectedKey = "ShowMerchants";
      break;

    case "/admin/create-members":
      selectedKey = "CreateMembers";
      break;
    case "/admin/show-members":
      selectedKey = "ShowMembers";
      break;
    case "/admin/edit-members":
      selectedKey = "EditMembers";
      break;

    case "/admin/create-items":
      selectedKey = "CreateItems";
      break;
    case "/admin/show-items":
      selectedKey = "ShowItems";
      break;
    case "/admin/edit-items":
      selectedKey = "EditItems";
      break;
    case "/admin/create-buy-merchants":
      selectedKey = "CreateBuyMerchants";
      break;
    case "/admin/show-buy-merchants":
      selectedKey = "ShowBuyMerchants";
      break;
    case "/admin/create-expenses":
      selectedKey = "CreateExpenses";
      break;
    case "/admin/show-expenses":
      selectedKey = "ShowExpenses";
      break;
    case "/admin/create-expense-names":
      selectedKey = "CreateExpenseNames";
      break;
    case "/admin/show-expense-names":
      selectedKey = "ShowExpenseNames";
      break;
    case "/admin/create-shops":
      selectedKey = "CreateShops";
      break;
    case "/admin/show-shops":
      selectedKey = "ShowShops";
      break;
    case "/admin/create-buy-items":
      selectedKey = "ShowBuyItems";
      break;
    case "/admin/create-supplier":
      selectedKey = "CreateSupplier";
      break;
    case "/admin/show-supplier":
      selectedKey = "ShowSupplier";
      break;
    case "/admin/edit-supplier/:id":
      selectedKey = "EditSupplier";
      break;
    //
    case "/admin/create-stocks":
      selectedKey = "CreateStocks";
      break;
    case "/admin/show-stocks":
      selectedKey = "ShowStocks";
      break;

    case "/admin/create-item-transfer":
      selectedKey = "ShowItemTransfer";
      break;
    case "/admin/show-item-transfer":
      selectedKey = "CreateItemTransfer";
      break;
    case "/admin/show-item-change-list":
      selectedKey = "ShowItemChangeList";
      break;

    case "/admin/create-bad-item":
      selectedKey = "CreateBadItems";
      break;
    case "/admin/show-bad-item":
      selectedKey = "ShowBadItems";
      break;

    case "/admin/create-staff":
      selectedKey = "CreateStaff";
      break;
    case "/admin/show-staff":
      selectedKey = "ShowStaff";
      break;
    case "/admin/edit-staff":
      selectedKey = "EditStaff";
      break;
    case "/admin/show-staff-commession":
      selectedKey = "StaffCommession";
      break;
    case "/admin/create-service":
      selectedKey = "CreateService";
      break;
    case "/admin/show-service":
      selectedKey = "ShowService";
      break;
    case "/admin/create-owner":
      selectedKey = "CreateOwner";
      break;
    case "/admin/show-owner":
      selectedKey = "ShowOwner";
      break;

    case "/admin/item-report":
      selectedKey = "ItemsReports";
      break;
    case "/admin/voucher-report":
      selectedKey = "VouchersReports";
      break;
    case "/admin/service-report":
      selectedKey = "ServicesReports";
      break;
    case "/admin/report-screem":
      selectedKey = "ReportScreem";
      break;
    //end start
    default:
      selectedKey = "Dashboard";
      break;
  }

  return (
    <Layout>
      <Header
        style={{ paddingTop: "13px", backgroundColor: "var(--white-color)" }}
      >
        <Button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            float: "left",
            backgroundColor: "var(--primary-color)",
            color: "var(--white-color)",
            marginRight: "3px",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Popover
          placement="bottom"
          content={content}
          title={text}
          trigger="click"
        >
          <Avatar
            style={{ float: "right", backgroundColor: "var(--primary-color)" }}
            icon={<UserOutlined />}
            size="large"
          />
        </Popover>
        <Title style={{ color: "var(--primary-color)" }} level={3}>
          Organic Nail Shop
        </Title>
      </Header>
      <Layout>
        <Sider
          collapsed={collapsed}
          style={{ backgroundColor: "var(--white-color)" }}
        >
          <Menu defaultSelectedKeys={[selectedKey]} mode="inline">
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="Sale" icon={<ShopOutlined />}>
              <Link to="/admin/sale">Sale</Link>
            </Menu.Item>
            <SubMenu
              key="Accounts"
              title="အကောင့်များ"
              icon={<FileImageOutlined />}
            >
              <Menu.Item key="ShowAccounts" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-accounts">စာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="CreateAccounts" icon={<SaveOutlined />}>
                <Link to="/admin/create-accounts">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>
              <Menu.Item key="ShowShops" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-shops">ဆိုင်များ</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Merchants"
              title="ကုန်သည်များ"
              icon={<UsergroupAddOutlined />}
            >
              <Menu.Item key="ShowMerchants" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-merchants">စာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="CreateMerchants" icon={<SaveOutlined />}>
                <Link to="/admin/create-merchants">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Members"
              title="မန်ဘာများ"
              icon={<UsergroupAddOutlined />}
            >
              <Menu.Item key="ShowMembers" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-members">စာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="CreateMembers" icon={<SaveOutlined />}>
                <Link to="/admin/create-members">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Items"
              title="ပစ္စည်းများ"
              icon={<DatabaseOutlined />}
            >
              <Menu.Item key="ShowItems" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-items">ပစ္စည်းများစာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="ShowStocks" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-stocks">Stockစာရင်း</Link>
              </Menu.Item>
              <Menu.Item
                key="ShowBuyMerchants"
                icon={<UnorderedListOutlined />}
              >
                <Link to="/admin/show-buy-merchants">ပစ္စည်းအဝယ်သွင်းရန်</Link>
              </Menu.Item>
              <Menu.Item
                key="ShowItemTransfer"
                icon={<UnorderedListOutlined />}
              >
                <Link to="/admin/show-item-transfer">
                  ပစ္စည်းလွှဲပြောင်းရန်
                </Link>
              </Menu.Item>
              <Menu.Item key="ShowOwner" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-owner">ပစ္စည်းထုတ်သုံးခြင်</Link>
              </Menu.Item>
              {/* <Menu.Item key="CreateBadItems" icon={<SaveOutlined />}>
                <Link to="/admin/create-bad-item">ချို့ယွင်းချက်ရှိပစ္စည်း</Link>
              </Menu.Item> */}
            </SubMenu>

            <SubMenu key="Service" title="ဝန်ဆောင်မှု" icon={<FlagOutlined />}>
              <Menu.Item key="CreateService" icon={<SaveOutlined />}>
                <Link to="/admin/create-service">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>

              <Menu.Item key="ShowService" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-service">စာရင်း</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Staff"
              title="ဝန်ထမ်းစာရင်း"
              icon={<ContactsOutlined />}
            >
              <Menu.Item key="CreateStaff" icon={<SaveOutlined />}>
                <Link to="/admin/create-staff">ဝန်ထမ်းစာရင်းသွင်းရန်</Link>
              </Menu.Item>

              <Menu.Item key="ShowStaff" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-staff">ဝန်ထမ်းစာရင်း</Link>
              </Menu.Item>

              <Menu.Item key="StaffCommession" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-staff-commession">
                  ၀န်ထမ်းလခနှင့်ကော်မရှင်
                </Link>
              </Menu.Item>
            </SubMenu>

            
            <SubMenu
              key="Owner"
              title="ပစ္စည်းထုတ်သုံးခြင်"
              icon={<UsergroupAddOutlined />}
            >
              <Menu.Item key="CreateOwner" icon={<SaveOutlined />}>
                <Link to="/admin/create-owner">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>

              <Menu.Item key="ShowOwnerList" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-owner">စာရင်း</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Expenses"
              title="ကုန်ကျစရိတ်များ"
              icon={<CalculatorOutlined />}
            >
              <Menu.Item key="ShowExpenses" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-expenses">ကုန်ကျစရိတ်များ</Link>
              </Menu.Item>
              <Menu.Item
                key="ShowExpenseNames"
                icon={<UnorderedListOutlined />}
              >
                <Link to="/admin/show-expense-names">ကုန်ကျစရိတ်အမည်များ</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="Reports" title="Reports" icon={<FolderAddOutlined />}>
              <Menu.Item key="ItemsReports" icon={<SaveOutlined />}>
                <Link to="/admin/item-report">Item</Link>
              </Menu.Item>

              <Menu.Item key="VouchersReports" icon={<UnorderedListOutlined />}>
                <Link to="/admin/voucher-report">Voucher</Link>
              </Menu.Item>
              <Menu.Item key="ServicesReports" icon={<UnorderedListOutlined />}>
                <Link to="/admin/service-report">Service</Link>
              </Menu.Item>
              <Menu.Item key="ReportScreem" icon={<UnorderedListOutlined />}>
                <Link to="/admin/report-screem">Report Screem</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="badItem"
              title="BadItem"
              icon={<UsergroupAddOutlined />}
            >
              <Menu.Item key="ShowBadItems" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-bad-item">စာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="CreateBadItem" icon={<SaveOutlined />}>
                <Link to="/admin/create-bad-item">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
        <Layout>
          <Content style={{ minHeight: "520px" }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-accounts" element={<CreateAccounts />} />
              <Route path="show-accounts" element={<ShowAccounts />} />
              <Route path="edit-accounts/:id" element={<EditAccounts />} />

              <Route path="create-merchants" element={<CreateMerchants />} />
              <Route path="show-merchants" element={<ShowMerchants />} />
              <Route path="edit-merchants/:id" element={<EditMerchants />} />

              <Route path="create-members" element={<CreateMembers />} />
              <Route path="show-members" element={<ShowMembers />} />
              <Route path="detail-members/:id" element={<DetailMembers />} />
              <Route path="edit-members/:id" element={<EditMembers />} />
              {/* supplier */}
              <Route path="create-supplier" element={<CreateSupplier />} />
              <Route path="show-supplier" element={<ShowSupplier />} />
              <Route path="edit-supplier/:id" element={<EditSupplier />} />

              <Route path="create-stocks" element={<CreateStock />} />
              <Route path="show-stocks" element={<ShowStocks />} />

              <Route
                path="create-item-transfer"
                element={<CreateItemTransfer />}
              />
              <Route path="show-item-transfer" element={<ShowItemTransfer />} />
              <Route path="edit-item-transfer/:id" element={<ShowItemTransfer />} />
              <Route
                path="show-item-change-list"
                element={<ShowItemChangeList />}
              />

              <Route path="create-bad-item" element={<CreateBadItem />} />
              <Route path="show-bad-item" element={<ShowBadItem />} />

              <Route path="create-staff" element={<CreateStaff />} />
              <Route path="show-staff" element={<ShowStaff />} />
              <Route path="edit-staff/:id" element={<EditStaff />} />
              <Route
                path="show-staff-commession"
                element={<StaffComession />}
              />

              <Route path="create-service" element={<CreateService />} />
              <Route path="show-service" element={<ShowService />} />
              <Route path="edit-service/:id" element={<EditService />} />

              <Route path="create-owner" element={<CreateOwners />} />
              <Route path="show-owner" element={<ShowOwners />} />
              <Route path="edit-owner/:id" element={<EditOwners />} />

              <Route path="item-report" element={<ItemsReports />} />
              <Route path="voucher-report" element={<VoucherReports />} />
              <Route path="service-report" element={<ServicesReport />} />
              <Route path="report-screem" element={<ReportScreem />} />

              {/* end supplier */}
              <Route path="create-items" element={<CreateItems />} />
              <Route path="show-items" element={<ShowItems />} />
              <Route path="edit-items/:id" element={<EditItems />} />

              <Route
                path="create-buy-merchants"
                element={<CreateBuyMerchants />}
              />
              <Route path="show-buy-merchants" element={<ShowBuyMerchants />} />
              <Route path="edit-buy-merchants/:id" element={<EditBuyMerchants />} />
              <Route path="create-expenses" element={<CreateExpenses />} />
              <Route path="show-expenses" element={<ShowExpenses />} />
              <Route path="edit-expenses/:id" element={<EditExpenses />} />
              <Route
                path="create-expense-names"
                element={<CreateExpenseNames />}
              />
              <Route path="show-expense-names" element={<ShowExpenseNames />} />
              <Route
                path="edit-expense-names/:id"
                element={<EditExpenseNames />}
              />
              <Route path="create-shops" element={<CreateShops />} />
              <Route path="show-shops" element={<ShowShops />} />
              <Route path="edit-shops/:id" element={<EditShops />} />
              <Route path="create-buy-items" element={<CreateBuyItems />} />
              <Route path="show-buy-items" element={<ShowBuyItems />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </Content>
          <Footer
            style={{
              backgroundColor: "var(--white-color)",
              textAlign: "center",
              fontWeight: "bold",
              color: "var(--primary-color)",
            }}
          >
            DEVELOP BY RCS
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default connect(null, { logout })(Admin);
