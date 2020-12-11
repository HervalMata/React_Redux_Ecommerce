import React from "react";
import {Card} from "antd";
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;

    return (
        <>
            <div className="col-md-7">image carousel</div>
            <div className="col-md-5">
                <Card actions={[
                    <>
                        <ShoppingCartOutlined className="text-success" />
                        <br/>
                        Adicionar Para o Carrinhp
                    </>,
                    <Link to="/">
                        <HeartOutlined className="text-info" />
                        <br/>
                        Adicionar Para Lista de Desejo
                    </Link>,
                ]}
                >
                    <Meta title={title} description={description} />
                    <p>
                        price/category/shipping/color/quantity available/sold
                    </p>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;