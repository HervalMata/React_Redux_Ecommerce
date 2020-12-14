import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserCart} from "../functions/user";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
       getUserCart(user.token).then((res) => {
           console.log("user cart res", JSON.stringify(res.data, null, 4));
           setProducts(res.data.products);
           setTotal(res.data.cartTotal);
       });
    }, []);

    const saveAddressToDb = () => {

    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Endereço de Entrega</h4>
                <br />
                <br />
                textarea
                <button
                    className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}>
                    Salvar
                </button>
                <hr />
                <h4>Tem Cupom?</h4>
                <br />
                Aplicar Cupom
            </div>

            <div className="col-md-6">
                <h4>Sumário da compra</h4>
                <hr />
                <p>Produtos {products.length}</p>
                <hr />
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <p>Total do carrinho: R$ {total},00</p>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">Finaliza Compra</button>
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-primary">Esvaziar carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;