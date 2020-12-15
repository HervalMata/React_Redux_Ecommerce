import React, {useState} from 'react';
import {Card, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {showAverage} from "../../functions/rating";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click para adicionar");
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.push({
                ...product, count: 1
            });
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart", JSON.stringify(unique));
            setTooltip("Added");
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    const { images, title, description, slug, price } = product;

    return (
        <>
            {product && product.ratings && product.ratings.length > 0
                ? (showAverage(product)) : (<div className="text-center pt-1 pb-3"> "Nenhuma avaliação ainda"</div>)}
            <Card
                cover = {
                    <img
                        src={images && images.length ? images[0].url : ""}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1" alt=""
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" />
                        <br/>
                        Visualizar Produto
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" />
                            <br/>
                            {product.quantity < 1 ? "Fora de Estoque" : "Adicionar Para o Carrinho"}
                        </a>
                    </Tooltip>,
                ]}
                >
                <Meta
                    title={`${title} - R$${price},00`}
                    description={`${description && description.substring(0, 40)}...`}
                />
            </Card>
        </>
    );
};

export default ProductCard;