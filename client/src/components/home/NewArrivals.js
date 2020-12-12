import React, {useEffect, useState} from "react";
import {getProducts, getProductsCount} from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import {Pagination} from "antd";

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProducts("createdAt", "desc", page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="container">
                {loading ? (
                    <LoadingCard count={3} />
                ) : (
                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            { productsCount > 3 ?
                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-danger pt-5 p-3">
                        <Pagination
                            current={page}
                            total={(productsCount / 3)}
                            onChange={(value) => setPage(value)}
                        />
                    </nav>
                </div>
            : ""}
        </>
    )
}

export default NewArrivals;

