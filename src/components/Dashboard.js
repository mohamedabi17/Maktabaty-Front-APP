import React, { useEffect } from "react";
import "./dashboard.css";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../rtk/slices/actions/auth";

const Dashboard = ({ login, isAuthenticated }) => {
  const auth = useSelector((state) => state.auth);
  const SHow = auth.user.is_staff;

  return (
    <>
      <h1 className="title">Dashboard</h1>
      {SHow ? (
        <div>
          <div className="Container">
            <div className="direction">
              <Link className="lien" to={`/dashboard/users`}>
                <i className="bx bxs-user-circle icon"> </i>
              </Link>

              <p className="sous">Users</p>
            </div>
            <div className="direction">
              <Link className="lien" to={`/dashboard/categories`}>
                <i className="bx bx-book icon"> </i>
              </Link>
              <p className="sous">Books</p>
            </div>
            <div className="direction">
              <Link className="lien" to={`/dashboard/commandes`}>
                <i className="bx bx-cart-add icon"> </i>
              </Link>
              <p className="sous">Orders</p>
            </div>
            <div className="direction">
              <Link className="lien" to={`/dashboard/progress`}>
                <i className="bx bx-pulse icon"></i>
              </Link>
              <p className="sous">Progress</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="err">404 Page Not Found,authorization ERROR Only Staff Access</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Dashboard);
