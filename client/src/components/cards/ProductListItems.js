import React from 'react';
import {Link} from "react-router-dom";

const ProductListItems = ({ product }) => {
    const { price, category, shipping, color, quantity, sold } = product;

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Preço{" "}
                <span className="label label-default label-pill pull-xs-right">
                    R$ {price},00
                </span>
            </li>

            {category && (
                <li className="list-group-item">
                    Categoria{" "}
                    <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
                        {category.name}
                    </Link>
                </li>
            )}

            <li className="list-group-item">
                Cor{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {color}
                </span>
            </li>

            <li className="list-group-item">
                Disponibilidade{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>

            <li className="list-group-item">
                Vendas{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    );
};

export default ProductListItems;