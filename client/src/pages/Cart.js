import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    return (
        <div className="container-fluid">
            <div className="row">
                <h4>Carrinho</h4>
                {JSON.stringify(cart)}
            </div>
        </div>
    );
};

export default Cart;