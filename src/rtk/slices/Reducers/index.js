import { combineReducers } from "redux";
import auth from "./auth";
import cart from "../Cart-Slice";
import categories from "../categories-slice";
import categoryproducts from "../category-Slice";
import products from "../products-slice";
import cartOrder from "../Order-Slice";

export default combineReducers({
  auth,
  cart,
  categories,
  categoryproducts,
  products,
  cartOrder,
});
