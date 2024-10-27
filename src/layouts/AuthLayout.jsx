import React from "react";
import "./AuthLayout.scss";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-login">
      <div className="form-login">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
