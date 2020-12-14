import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {emptyUserCart, getUserCart, saveUserAddress} from "../functions/user";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
       getUserCart(user.token).then((res) => {
           console.log("user cart res", JSON.stringify(res.data, null, 4));
           setProducts(res.data.products);
           setTotal(res.data.cartTotal);
       });
    }, []);

    const emptyCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });

        emptyUserCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success("Carrinho está vazio. Continue comprando.");
        });
    };

    const saveAddressToDb = () => {
        saveUserAddress(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
            }
        });
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Endereço de Entrega</h4>
                <br />
                <br />
                <ReactQuill
                    theme="snow" value={address}
                    onChange={setAddress}
                />
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
                        <button
                            disabled={!addressSaved || !products.length}
                            className="btn btn-primary"
                        >
                            Finaliza Compra
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button
                            disabled={!products.length}
                            onClick={emptyCart}
                            className="btn btn-primary"
                        >
                            Esvaziar carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;