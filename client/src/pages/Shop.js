import React, {useEffect, useState} from 'react';
import {fetchProductsByFilter, getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {Menu, Slider} from "antd";
import {DollarOutlined} from "@ant-design/icons";

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    let dispatch = useDispatch();

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

    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);


    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            console.log(res.data);
            setProducts(res.data);
        });
    };

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: ""},
        });
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4>Filtros</h4>
                    <hr />

                    <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                        <SubMenu key="1" title={
                            <span className="h6">
                                R <DollarOutlined /> Preço
                            </span>
                        } >
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(v) => `R$${v}`}
                                    range value={price}
                                    onChange={handleSlider} max="4999"
                                />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9 pt-2">
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