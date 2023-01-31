import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../rtk/slices/actions/auth";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);
  const auth = useSelector((state) => state.auth);
  const params = useParams();

  const verify_account = (e) => {
    const uid = params.uid;
    const token = params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    console.log(auth.user.id)
    if (auth.user.id === 1) {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
