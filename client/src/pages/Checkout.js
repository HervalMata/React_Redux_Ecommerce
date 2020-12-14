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
                <h1>R$ {total},00</h1>
                {JSON.stringify(products)}
                <hr />
                <p>Produtos</p>
                <hr />
                <p>Lista de Produtos</p>
                <hr />
                <p>Total do carrinho: $x</p>

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