import React from "react";
import Slider from "./components/Slider";
import ProductList from "./components/ProductList";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Sidebar from "./components/Sidebar";
import Addproduct from "./components/Addproduct";
import Producttable from "./components/Producttable";
import Edit from "./components/Edit";
// import "../loader";
// import AppNavbar from './components/AppNavbar';
import Cart from "./components/Cart";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import Activate from "./components/Activate";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Commandes from "./components/Commandes";
import Users from "./components/Users";
// import Facebook from './components/Facebook';
// import Google from './components/Google';
import { Provider } from "react-redux";
import store from "./rtk/store";
import Lignes from "./components/Lignes";

import CmdUser from "./components/CmdUser";
import Progress from "./components/Progress";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Provider store={store()}>
      <div className="App">
        <Router>
          <Layout>
            <div className="row">
              <div className="col-2 position-relative">
                <Sidebar />
              </div>
              <div className="col-10 mt-3">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Slider />
                        <ProductList />
                      </>
                    }
                  />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/dashboard/categories" element={<Producttable />} />
                  
                  <Route path="/users/:id" element={<CmdUser />} />
                  <Route path="/dashboard/commandes" element={<Commandes />} />
                  <Route path="/dashboard/progress" element={<Progress />} />
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/dashboard/users" element={<Users />} />
                  <Route path="/LignesCommandes" element={<Lignes />} />

                  <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                  />
                  {/* <Route path="categories/:productId" element={<ProductDetails />} /> */}
                  <Route path="/add" element={<Addproduct />} />
                  <Route path="categories/edit/:productId" element={<Edit />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* <Route exact path='/facebook' component={Facebook} />
              <Route exact path='/google' component={Google} /> */}
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/password/reset/confirm/:uid/:token"
                    element={<ResetPasswordConfirm />}
                  />
                  <Route path="/activate/:uid/:token" element={<Activate />} />
                </Routes>
              </div>
            </div>
          </Layout>
        </Router>
      </div>
    </Provider>
  );
}
export default App;
