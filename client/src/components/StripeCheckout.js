import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {createPaymentIntent} from "../functions/stripe";
import {Link} from "react-router-dom";

const StripeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token).then((res) => {
          console.log("create payment intent", res.data);
          setClientSecret(res.data.clientSecret);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(cardElement),
                billing_details: {
                    name: e.target.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
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
                fontSmoothing: "antialised",
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
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Pagamento realizado com sucesso.{" "}
                <Link to="/user/history">
                    Veja seu histórico de compras.
                </Link>
            </p>
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
            </form>
        </>
    );

};

export default StripeCheckout;