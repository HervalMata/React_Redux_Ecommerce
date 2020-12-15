import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {applyCoupon, emptyUserCart, getUserCart, saveUserAddress} from "../functions/user";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [discountError, setDiscountError] = useState("");

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
            setTotalAfterDiscount("");
            setCoupon("");
            toast.success("Carrinho está vazio. Continue comprando.");
        });
    };

    const saveAddressToDb = () => {
        saveUserAddress(address, user.token).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
            }
        });
    };

    const applyDiscountCoupon = () => {
        console.log("send coupon to backend");
        applyCoupon(coupon, user.token).then((res) => {
            console.log("RES ON COUPON APPLIED", res.data);
            if (res.data) {
                setTotalAfterDiscount(res.data);
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                });
            }

            if (res.data.err) {
                setDiscountError(res.data.err);
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                });
            }
        });
    };
    
    const showAddress = () => (
        <>
            <ReactQuill theme="snow" value={address} onChange={setAddress} />
            <button className="btn btn-primary mt-2" onClick={saveAddressToDb} >
                Salvar
            </button>
        </>
    );
    
    const showProductSummary = () => 
        products.map((p, i) => (
            <div key={i}>
                <p>
                    {p.product.title} ({p.color}) x {p.count} = {" "}
                    {p.product.price * p.count}
                </p>
            </div>
        ));
    
    const showApplyCoupon = () => (
        <>
            <input 
                onChange={(e) => {
                    setCoupon(e.target.value);
                    setDiscountError("");
                }}
                value={coupon} type="text" className="form-control"
            />
            <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
                Aplicar Cupom
            </button>
        </>
    );

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Endereço de Entrega</h4>
                <br />
                <br />
                {showAddress()}
                <hr />
                <h4>Tem Cupom?</h4>
                <br />
                {showApplyCoupon()}
                <br />
                {discountError && <p className="bg-danger p-2">{discountError}</p>}
            </div>

            <div className="col-md-6">
                <h4>Sumário da compra</h4>
                <hr />
                <p>Produtos {products.length}</p>
                <hr />
                {showProductSummary()}
                <hr />
                <p>Total do carrinho: R$ {total},00</p>

                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2">
                        Desconto aplicado: Total Para Pagamento: R$ {totalAfterDiscount},00
                    </p>
                )}

                <div className="row">
                    <div className="col-md-6">
                        <button
                            disabled={!addressSaved || !products.length}
                            className="btn btn-primary"
                            onClick={() => history.push("/payment")}
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