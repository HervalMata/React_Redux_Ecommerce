import React, { useState } from 'react';
import {Menu} from "antd";
import {AppstoreAddOutlined, SettingOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const Header = () => {
    const [current, setCurrent] = useState("home");
    const handleClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreAddOutlined />}>
                Home
            </Item>
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                Cadastro
            </Item>
            <Item key="login" icon={<UserOutlined />} className="float-right">
                Login
            </Item>
            <SubMenu icon={<SettingOutlined />} title="Usuário">
                <Item key="setting 1">Option 1</Item>
                <Item key="setting 1">Option 1</Item>
            </SubMenu>
        </Menu>
    )
};

export default Header;