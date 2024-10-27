import React, { useState } from "react";
import userService from "services/user";

const validateForm = data => {
  let validation = {};
  if (data.username === "") {
    validation = { ...validation, username: "Username is required" };
  }
  if (data.password === "") {
    validation = { ...validation, password: "Password is required" };
  }
  if (data.confirmPassword === "") {
    validation = { ...validation, confirmPassword: "Confirm password is required" };
  }
  if (data.password !== data.confirmPassword) {
    validation = {
      ...validation,
      password: "Password is not match",
      confirmPassword: "Confirm password is not match"
    };
  }

  let isValid = false;
  if (Object.keys(validation).length > 0) {
    isValid = Object.values(validation).every(e => !e);
  } else {
    isValid = true;
  }
  return [isValid, validation];
};

const Register = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [validation, setValidation] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const onChange = (field, value) => {
    const newFormData = {
      ...data,
      [field]: value
    };
    const [, validationData] = validateForm(newFormData);
    setValidation({ ...validation, [field]: validationData[field] });
    setData(newFormData);
  };
  const handleEnter = e => {
    if (e.key === "Enter") {
      login(e);
    }
  };

  const signup = async e => {
    e.preventDefault();
    const [isValid, validationData] = validateForm(data);
    setValidation(validationData);
    if (!isValid) return;

    const params = {
      username: data.username,
      password: data.password
    };

    try {
      const response = await userService.register(params);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="title">
        <span>Đăng ký tài khoản</span>
      </div>
      <form>
        <div className="field-phone">
          <input
            type="text"
            className={`ip-text ${
              !!validation.username ? "validate-text-field" : ""
            }`}
            defaultValue=""
            placeholder="Tên đăng nhập ..."
            name="Username"
            autoComplete="off"
            onKeyDown={handleEnter}
            onChange={event => onChange("username", event.target.value)}
          />
          {validation.username && (
            <span className="validate-message">{validation.username}</span>
          )}
        </div>
        <div className="field-phone">
          <input
            type="password"
            className={`ip-text ${
              !!validation.password ? "validate-text-field" : ""
            }`}
            defaultValue=""
            autoComplete="off"
            placeholder="Mật khẩu ..."
            name="Password"
            onKeyDown={handleEnter}
            onChange={event => onChange("password", event.target.value)}
          />
          {validation.password && (
            <span className="validate-message">{validation.password}</span>
          )}
        </div>
        <div className="field-phone">
          <input
            type="password"
            className={`ip-text ${
              !!validation.confirmPassword ? "validate-text-field" : ""
            }`}
            defaultValue=""
            autoComplete="off"
            placeholder="Nhập lại mật khẩu ..."
            name="ConfirmPassword"
            onKeyDown={handleEnter}
            onChange={event => onChange("confirmPassword", event.target.value)}
          />
          {validation.confirmPassword && (
            <span className="validate-message">
              {validation.confirmPassword}
            </span>
          )}
        </div>
        <div className="field-control">
          <button className="btn-register" onClick={signup}>
            ĐĂNG KÝ
          </button>
        </div>
        <div className="field-control">
          <a href="/auth/login" className="btn-return-to-login">
            Đã có tài khoản?
          </a>
        </div>
      </form>
    </>
  );
};

export default Register;
