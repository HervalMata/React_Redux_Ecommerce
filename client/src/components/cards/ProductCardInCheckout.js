import React from 'react';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import ModalImage from 'react-modal-image';
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
    let dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;

        if (count > p.quantity) {
            toast.error(`Máxima Quantidade disponivel: ${p.quantity}`);
            return;
        }

        let cart = [];

        if (typeof window !== "undefined") {

            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count;
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    const handleRemove = () => {
        let cart = [];

        if (typeof window !== "undefined") {

            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1);
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "50px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url}
                                        large={p.images[0].url}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>R${p.price},00</td>
                <td>{p.color}</td>
                <td className="text-center">
                    <input
                        type="number" className="form-control"
                        value={p.count} onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center">
                    {p.shipping === "Yes" ? (
                        <CheckCircleOutlined className="text-success" />
                    ) : (
                        <CloseCircleOutlined className="text-danger" />
                    )}
                </td>
                <td className="text-center">
                    <CloseOutlined
                        onClick={handleRemove}
                        className="text-danger pointer"
                    />
                </td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;