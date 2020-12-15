import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {createPaymentIntent} from "../functions/stripe";

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

    };

    const handleChange = async (e) => {

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
            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement
                    id="card-element" options={cartStyle} onChange={handleChange}
                />
                <button className="stripe-button" disabled={processing || disabled || succeeded}>
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner"></div> : "Pagar" }
                    </span>
                </button>
            </form>
        </>
    );

};

export default StripeCheckout;