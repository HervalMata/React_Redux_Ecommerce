import React from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {showAverage} from "../../functions/rating";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
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
        }
    };

    const { images, title, description, slug } = product;

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
                    <>
                        <ShoppingCartOutlined className="text-danger" />
                        <br/>
                        Adicionar para o carrinho
                    </>
                ]}
                >
                <Meta
                    title={title} description={`${description && description.substring(0, 40)}...`}
                />
            </Card>
        </>
    );
};

export default ProductCard;