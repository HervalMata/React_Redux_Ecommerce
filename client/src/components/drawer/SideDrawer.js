import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Drawer } from "antd";

const SideDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const { drawer, cart } =useSelector((state) => ({ ...state}));

    return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>
};

export default SideDrawer;