import React, {useEffect, useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector} from "react-redux";
import {getUserOrders} from "../../functions/user";
import {CheckCircleOutlined} from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink, Document, Page, Text, View, PDFViewer, Stylesheet } from "@react-pdf/renderer";

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

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={
                <Document>
                    <Page size="A4">
                        <View>
                            <Text>Section #1</Text>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            }
            fileName="invoice-pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    );

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
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