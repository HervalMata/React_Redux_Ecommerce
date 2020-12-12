import React, { useState } from 'react';
import {Menu} from "antd";
import {AppstoreAddOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import firebase from "firebase";
import Search from "../forms/Search";

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
                <Link to="/">Home</Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Cadastro</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
                    {user && user.role === 'subscriber' && (
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}
                    {user && user.role === 'admin' && (
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Sair
                    </Item>
                </SubMenu>
            )}

            <span className="float-right p-1">
                <Search />
            </span>
        </Menu>
    )
};

export default Header;