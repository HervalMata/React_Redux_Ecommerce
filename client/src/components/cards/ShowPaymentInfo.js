import React from 'react';

const ShowPaymentInfo = ({ order }) => (
    <div>
        <p>
            <span>Ordem Nº: {order.paymentIntent.id}</span>
            {" / "}
            <span>
                Quantidade:{" / "}
                {(order.paymentIntent.amount /= 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </span>
            {" / "}
            <span>Moeda: {order.paymentIntent.currency.toUpperCase()}</span>
            {" / "}
            <span>Forma de Pagamento: {order.paymentIntent.payment_method_types[0]}</span>
            {" / "}
            <span>Situação: {order.paymentIntent.status.toUpperCase()}</span>
            {" / "}
            <span>
                Data:{" / "}
                {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </span>
            {" / "}
            <span className="badge bg-primary text-white">
                Status: {order.orderStatus}
            </span>
        </p>
    </div>
);

export default ShowPaymentInfo;