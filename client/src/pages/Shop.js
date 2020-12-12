import React, {useEffect, useState} from 'react';
import {getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    Filtro
                </div>
                <div className="col-md-9">
                    {loading ? (
                        <h4 className="text-danger">Carregando...</h4>
                    ) : (
                        <h4 className="text-danger">Produtos</h4>
                    )}

                    {products.length < 1 && <p>Nenhum produto encontrado</p>}
                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;