import {
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  WechatOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menus = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "CÁ NHÂN",
    children: [
      { key: "11", label: "Thông tin cơ bản", path: "/personal-info" },
      { key: "12", path: "/resume", label: "Resume" }
    ]
  },
  {
    key: "2",
    icon: <SettingOutlined />,
    label: "HỆ THỐNG",
    children: [
      { key: "21", path: "/role", label: "Phân quyền" },
      { key: "22", path: "/account", label: "Tài khoản" },
      { key: "23", path: "/service", label: "Dịch vụ" }
    ]
  },
  {
    key: "3",
    icon: <FileTextOutlined />,
    label: "BÀI VIẾT",
    children: [
      { key: "31", path: "/post", label: "Bài viết" },
      { key: "32", path: "/category", label: "Danh mục" }
    ]
  },
  {
    key: "4",
    icon: <WechatOutlined />,
    label: "Góp ý",
    path: "/test"
  }
];

const Navigation = props => {
  const [openKeys, setOpenKeys] = useState([""]);
  const [selectKeys, setSelectKeys] = useState([""]);
  const navigate = useNavigate();

  let location = useLocation();
  useEffect(() => {
    const selectedKeys = [];
    const current = menus.find(f => {
      if (f.hasOwnProperty("children")) {
        const childMenu = f.children.find(fc => fc.path === location.pathname);
        if (childMenu) {
          selectedKeys.push(childMenu.key);
          return true;
        }
        return false;
      }
      return f.path == location.pathname;
    });
    if (current) {
      setSelectKeys([...selectedKeys, current.key]);
      setOpenKeys([current.key]);
    }
  }, [location]);

  const onMenuClick = ({ key, keyPath }) => {
    const menuKey = keyPath[keyPath.length - 1];
    const menu = menus.find(f => f.key === menuKey);
    if (!menu) return;
    if (menu.hasOwnProperty('children')) {
      const subMenu = menu.children?.find(f => f.key === key);
      if (!subMenu) return;
      navigate(subMenu.path);
    } else if (menu.path) {
      navigate(menu.path);
    }
  };
  return (
    <Menu
      key={selectKeys.join('-')}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectKeys}
      defaultOpenKeys={openKeys}
      selectable={false}
      style={{ userSelect: "none" }}
      onClick={onMenuClick}
      items={menus}
    />
  );
};

export default Navigation;
