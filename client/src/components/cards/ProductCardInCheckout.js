import React from 'react';

const ProductCardInCheckout = ({ p }) => {
    return (
        <tbody>
            <tr>
                <td>Image</td>
                <td>{p.title}</td>
                <td>R${p.price},00</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>Shipping Icon</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;