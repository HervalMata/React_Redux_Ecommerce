import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

const Cart = () => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saverderToDb = () => {

    };

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Imagem</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Entrega</th>
                    <th scope="col">Remover</th>
                </tr>
            </thead>
            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}
        </table>
    );

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
                        showCartItems()
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
                        <button
                            onClick={saverderToDb}
                            className="btn btn-sm btn-primary mt-2"
                            disabled={!cart.length}
                        >
                            Ir para Pagamento
                        </button>
                    ) : (
                        <button className="btn btn-sm btn-primary mt-2">
                            <Link to={{
                                pathname: "/login",
                                state: { from: "cart" },
                            }}
                            >
                                Login para Pagamento
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;