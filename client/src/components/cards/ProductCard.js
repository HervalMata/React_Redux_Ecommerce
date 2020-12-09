import React from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, title, description, slug } = product;

    return (
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
    );
};

export default ProductCard;