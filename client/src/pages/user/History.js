import React, {useEffect, useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector} from "react-redux";
import {getUserOrders} from "../../functions/user";

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

    const showOrderInTable = (order) => <p>Cada ordem e seus produtos</p>;

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