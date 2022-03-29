import { combineReducers } from "redux";
import merchant from "./merchant";
import member from "./member";
import item from "./item";
import supplier from "./supplier";
import item_transfer from "./item_transfer";
import auth from "./auth";
import shop from "./shop";
import expense from "./expense";
import account from "./account";
import expense_name from "./expense_name";
import service from "./service";
import staff from "./staff";
import purchase from "./purchase";
import stock from "./stock";
import bad_item from "./bad_item";
import owner from "./owner";
import voucher from "./voucher";


const reducers = combineReducers({
  merchant,
  member,
  supplier,
  item_transfer,
  auth,
  shop,
  expense,
  account,
  expense_name,
  service,
  item,
  staff,
  purchase,
  stock,
  bad_item,
  owner,
  voucher,
});

export default reducers;
