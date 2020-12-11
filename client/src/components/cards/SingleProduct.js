import React from "react";
import {Card} from "antd";
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;

    return (
        <>
            <div className="col-md-7">
                <Carousel showArrows={true} autoplay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} /> )}
                </Carousel>
            </div>
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