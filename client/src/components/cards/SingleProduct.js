import React from "react";
import {Card, Tabs} from "antd";
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating";

const { TabPane } = Tabs;


const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, description, _id } = product;

    return (
        <>
            <div className="col-md-7">
                <Carousel showArrows={true} autoplay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} /> )}
                </Carousel>
                <Tabs type="card">
                    <TabPane tab="Descrição" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="Mais" key="2">
                        Ligue para (xx) xxxxx-xxxx para saber mais sobre este produto.
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product && product.ratings && product.ratings.length > 0
                 ? showAverage(product) : "Nenhuma avaliação ainda"}
                <Card actions={[
                    <>
                        <ShoppingCartOutlined className="text-success" />
                        <br/>
                        Adicionar Para o Carrinho
                    </>,
                    <Link to="/">
                        <HeartOutlined className="text-info" />
                        <br/>
                        Adicionar Para Lista de Desejo
                    </Link>,
                    <RatingModal>
                        <StarRating
                            name={_id} numberOfStars={5} rating={star}
                            changeRating={onStarClick}
                            isSelectable={true} starRatedColor="red"
                        />
                    </RatingModal>,
                ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;