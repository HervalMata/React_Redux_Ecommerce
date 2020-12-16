import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => (
    <>
        {orders.map((order) => (
            <div key={order._id} className="row pb-5">
                <div className="btn btn-block bg-light">
                    <ShowPaymentInfo order={order} showStatus={false} />

                    <div className="row">
                        <div className="col-md-4">
                            Status da Entrega
                        </div>
                        <div className="row pb-8">
                            <select
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="form-control" defaultValue={order.orderStatus}
                                name="status"
                            >
                                <option value="Não Processado">Não Processado</option>
                                <option value="Processando">Processandp</option>
                                <option value="Despachado">Despachado</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Completado">Completado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default Orders;