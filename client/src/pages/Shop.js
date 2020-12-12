import React, {useEffect, useState} from 'react';
import {fetchProductsByFilter, getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import {useSelector} from "react-redux";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            console.log(res.data);
            setProducts(res.data);
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