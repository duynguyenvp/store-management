import responseExtractor from "helpers/responseExtractor";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "services/user";
import authActions from "stores/actions/authAction";

const validateForm = data => {
  let validation = {};
  if (data.username === "") {
    validation = { ...validation, username: "Username is required" };
  }
  if (data.password === "") {
    validation = { ...validation, password: "Password is required" };
  }

  let isValid = false;
  if (Object.keys(validation).length > 0) {
    isValid = Object.values(validation).every(e => !e);
  } else {
    isValid = true;
  }
  return [isValid, validation];
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    username: "",
    password: ""
  });
  const [validation, setValidation] = useState({
    username: "",
    password: ""
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

  const login = async e => {
    e.preventDefault();
    const [isValid, validationData] = validateForm(data);
    setValidation(validationData);
    if (!isValid) return;

    const params = {
      username: data.username,
      password: data.password
    };

    try {
      const response = await userService.login(params);
      const { isSuccess, data, errorMessage } =
        responseExtractor.extract(response);
      if (isSuccess) {
        dispatch(authActions.login(data));
        navigate("/");
      } else {
        console.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const regisger = () => {
    navigate("/auth/register");
  };
  return (
    <>
      <div className="title">
        <span>Đăng nhập</span>
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
        <div className="field-control">
          <button type="button" className="btn-login" onClick={login}>
            ĐĂNG NHẬP
          </button>
          <button type="button" className="btn-register" onClick={regisger}>
            ĐĂNG KÝ
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
