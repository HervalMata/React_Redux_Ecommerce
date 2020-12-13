import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <h4>Carrinho / {cart.length} Produto</h4>

                    {!cart.length ? (
                        <p>
                            Nemhum produtos no carrinho. <Link to="/shop">Continue comprando.</Link>
                        </p>
                    ) : (
                        "mostrar itens do carrinho"
                    )}
                </div>
                <div className="col-md-4">
                    <h4>Sumário do Carrinho</h4>
                    <hr />
                    <p>Produtos</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>
                                {c.title} x {c.count} = R${c.price * c.count},00
                            </p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>R${getTotal()},00</b>
                    <hr />
                    {user ? (
                        <button className="btn btn-sm btn-primary mt-2">
                            Ir para Pagamento
                        </button>
                    ) : (
                        <button className="btn btn-sm btn-primary mt-2">
                            Login para Pagamento
                        </button>
                    )}
                </div>
                <h4>Carrinho</h4>
            </div>
        </div>
    );
};

export default Cart;