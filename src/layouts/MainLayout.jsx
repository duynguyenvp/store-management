import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, theme, Button, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import defaultAvatar from "../assets/images/avatar.jpg";
import Navigation from "./Navigation";
import { useDispatch } from "react-redux";
import authActions from "stores/actions/authAction";
// import PopupChangePassword from '../components/PopupChangePassword'

const { Content, Sider, Header } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const onOpenChange = data => {
    console.log(data);
  };
  const onSigout = () => {
    dispatch(authActions.logout());
    navigate("/auth/login");
  };

  const items = [
    {
      label: "Change Password",
      onClick: onOpenChange,
      key: "0"
    },
    {
      type: "divider"
    },
    {
      label: "Signout",
      onClick: onSigout,
      key: "1"
    }
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical" />
        <Navigation />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
            paddingRight: "1rem",
            background: colorBgContainer
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64
            }}
          />
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            onOpenChange={onOpenChange}
          >
            <a onClick={e => e.preventDefault()} style={{ color: "unset" }}>
              <Space>
                <Avatar
                  src={defaultAvatar}
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
                Duy Nguyen
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
