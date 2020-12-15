import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {createPaymentIntent} from "../functions/stripe";
import {Link} from "react-router-dom";
import DollarOutlined, {CheckOutlined} from "@ant-design/icons";
import {Card} from "antd";
import {createOrder, emptyUserCart} from "../functions/user";

const StripeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token).then((res) => {
          console.log("create payment intent", res.data);
          setClientSecret(res.data.clientSecret);
          setCartTotal(res.data.cartTotal);
          setTotalAfterDiscount(res.data.totalAfterDiscount);
          setPayable(res.data.payable);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.value,
                },
            },
        });

        if (payload.error) {
            setError(`Pagamento falhou ${payload.error.message}`);
            setProcessing(false);
        } else {
            createOrder(payload, user.token).then((res) => {
                if (res.data.ok) {
                    if (typeof window !== "undefined")
                        localStorage.removeItem("cart");
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: [],
                        });

                        dispatch({
                            type: "COUPON_APPLIED",
                            payload: false,
                        });

                        emptyUserCart(user.token);
                }

            });
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontsize: "18px", "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            {!succeeded && (
                <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="alert alert-success">{`Total após desconto: R$${totalAfterDiscount}`}</p>
                    ) : (
                        <p className="alert alert-danger">Nenhum cupom aplicado</p>
                    )}
                </div>
            )}
            <div className="text-center pb-5">
                <Card
                    cover={
                        <img
                            src={""}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                marginBottpm: "-50px",
                            }}
                             alt=""/>
                        }
                        actions={[
                            <>
                                <DollarOutlined className="text-info" />
                                <br />
                                Total: R$ {cartTotal}
                            </>,
                            <>
                                <CheckOutlined className="text-info" />
                                <br />
                                Total Pagamento: R$ {(payable / 100).toFixed(2)}
                            </>,
                        ]}
                />
            </div>

            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement
                    id="card-element" options={cartStyle} onChange={handleChange}
                />
                <button className="stripe-button" disabled={processing || disabled || succeeded}>
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner"></div> : "Pagar" }
                    </span>
                </button>
                <br />
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                <br />
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Pagamento realizado com sucesso.{" "}
                    <Link to="/user/history">
                        Veja seu histórico de compras.
                    </Link>
                </p>
            </form>
        </>
    );

};

export default StripeCheckout;