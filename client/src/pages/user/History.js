import React, {useEffect, useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector} from "react-redux";
import {getUserOrders} from "../../functions/user";
import {CheckCircleOutlined} from "@ant-design/icons";

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Total</th>
                    <th scope="col">Entrega</th>
                </tr>
            </thead>

            <tbody>
            {order.products.map((p, i) => (
                <tr key={i}>
                    <td>
                        <b>{p.product.title}</b>
                    </td>
                    <td>R$ {p.product.price},00</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>
                        {p.product.shipping === "Yes" ? (
                            <CheckCircleOutlined style={{ color: "green" }} />
                        ) : (
                            <CheckCircleOutlined style={{ color: "red" }} />
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <p>Mostrar Infornação do Pagamento</p>
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        <p>Download em PDF</p>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col text-center">
                    <h4>
                        {orders.length > 0 ? "Ordens dos Usuários" : "Nenhuma ordem para este usuário"}
                    </h4>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;