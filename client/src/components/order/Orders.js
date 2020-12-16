import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import {CheckCircleOutlined} from "@ant-design/icons";

const Orders = ({ orders, handleStatusChange }) => {
    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Entrega</th>
                </tr>
            </thead>

            <tbody>
            {order.map((p, i) => (
                <tr key={i}>
                    <td>
                        <b>{p.product.title}</b>
                    </td>
                    <td>R$ {p.product.price},00</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>{p.product.shipping === "Yes" ? (
                        <CheckCircleOutlined style={{ colon: "green" }} />
                    ) : (
                        <CheckCircleOutlined style={{ colon: "red" }} />
                    )}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
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
                    {showOrderInTable(order)}
                </div>
            ))}
        </>
    );
};

export default Orders;