import React, { useState } from 'react';
import {Menu} from "antd";
import {AppstoreAddOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from "firebase";

const { SubMenu, Item } = Menu;
const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({...state}));
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreAddOutlined />}>
                Home
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    Cadastro
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    Login
                </Item>
            )}

            {user && (
                <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
                    <Item key="setting 1">Option 1</Item>
                    <Item key="setting 1">Option 1</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Sair
                    </Item>
                </SubMenu>
            )}
        </Menu>
    )
};

export default Header;