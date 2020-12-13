import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Drawer } from "antd";
import {Link} from "react-router-dom";

const SideDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const { drawer, cart } =useSelector((state) => ({ ...state}));

    const imageStyle = {
        width: "100%", height: "50px", objectFit: "cover"
    };

    return (
        <Drawer
            className="text-center" visible={drawer}
            title={`Carrinho / ${cart.length} Produto(s)`}
            placement="right" closable={false}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}
        >
            {cart.map((p) => (
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0].url} style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        ) : (
                            <p className="text-center bg-secondary text-light">
                                {p.title} x {p.count}
                            </p>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }
                    className="text-center btn btn-primary btn-raised btn-block"
                >
                    Ir para carrinho
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;