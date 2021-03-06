import React, {useEffect, useState} from 'react';
import {fetchProductsByFilter, getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Menu, Radio, Slider} from "antd";
import {DollarOutlined, DownSquareOutlined, StarOutlined} from "@ant-design/icons";
import {getCategories} from "../functions/category";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [colors, setColors] = useState([
        "red", "Green", "Blue", "Pink", "Yellow"
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");

    let dispatch = useDispatch();

    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
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

    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id} name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setStar("")
        setColor("");
        setShipping("");
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState });
    };

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setColor("");
        setShipping("");
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar(num);
        setColor("");
        setShipping("");
        fetchProducts({ stars: num });
    };

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    const showColors = () =>
        colors.map((c) => (
            <Radio
                value={c} name={c} checked={c === color}
                onChange={handleColor} className="pb-1 pl-4 pr-4"
            >
                {c}
            </Radio>
        ));

    const handleColor = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setColor(e.target.value);
        setShipping("");
        fetchProducts({ color: e.target.value });
    };

    const showShipping = () => (
        <>
            <Checkbox
                onChange={handleShippingChange}
                className="pb-2 pl-4 pr-4"
                value="Yes"
                checked={shipping === "Yes"}
            >
                Sim
            </Checkbox>

            <Checkbox
                onChange={handleShippingChange}
                className="pb-2 pl-4 pr-4"
                value="No"
                checked={shipping === "No"}
            >
                Não
            </Checkbox>
        </>
    );

    const handleShippingChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setColor("");
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4>Filtros</h4>
                    <hr />

                    <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
                        <SubMenu key="1" title={
                            <span className="h6">
                                R<DollarOutlined />Preço
                            </span>
                        } >
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(v) => `R$${v}`}
                                    range value={price}
                                    onChange={handleSlider} max="100"
                                />
                            </div>
                        </SubMenu>

                        <SubMenu key="2" title={
                            <span className="h6">
                                <DownSquareOutlined /> Categorias
                            </span>
                        } >
                            <div style={{ margin: "-10px" }}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu key="3" title={
                            <span className="h6">
                                <StarOutlined /> Avaliações
                            </span>
                        } >
                            <div style={{ margin: "-10px" }}>
                                {showStars()}
                            </div>
                        </SubMenu>

                        <SubMenu key="4" title={
                            <span className="h6">
                                <DownSquareOutlined /> Cores
                            </span>
                        } >
                            <div style={{ margin: "-10px" }} className="pr-5">
                                {showColors()}
                            </div>
                        </SubMenu>

                        <SubMenu key="5" title={
                            <span className="h6">
                                <DownSquareOutlined /> Entrega
                            </span>
                        } >
                            <div style={{ margin: "-10px" }} className="pr-5">
                                {showShipping()}
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