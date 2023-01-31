import React from "react";
import { Link } from "react-router-dom";
import Image1 from "./Images/maktabaty.jpg";
import { Image } from "react-bootstrap";
import "./Navbar.css";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../rtk/slices/actions/auth";
// import $ from "jquery";
const Navbar = ({ logout, isAuthenticated }) => {
  const cart = useSelector((state) => state.cart);

  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <Fragment className="auth">
      <Link className="nav-link" to="/login">
        <button
          className="nav-item btn btn-primary"
          style={{ backgroundColor: "#312450" }}
        >
          Login
        </button>
      </Link>

      <Link className="nav-link" to="/signup">
        <button
          className="nav-item btn btn-primary"
          style={{ backgroundColor: "#312450" }}
        >
          Sign Up
        </button>
      </Link>
    </Fragment>
  );

  const authLinks = () => (
    <button
      className="nav-item btn btn-primary"
      style={{ backgroundColor: "#312450" }}
      onClick={logout_user}
    >
      Logout
    </button>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <Image className="maktabaty" src={Image1} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link> */}
              </li>
            </ul>
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Products
              </Link>
              {/* <Link to="/cart" className="nav-link">
                Cart +<b>{cart.length}</b>
              </Link> */}
              <div
                id="cart"
                data-totalitems={cart.length}
                className={
                  cart.length === 0
                    ? "cart background-blue"
                    : "cart background-red shake"
                }
              >
                <Link to="/cart">
                  <i className="bx bxs-shopping-bag"></i>
                </Link>
              </div>
            </Nav>
            <div className="d-flex log">
              {isAuthenticated ? authLinks() : guestLinks()}
            </div>
            {redirect ? <Navigate to="/" /> : <Fragment></Fragment>}
          </div>
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
