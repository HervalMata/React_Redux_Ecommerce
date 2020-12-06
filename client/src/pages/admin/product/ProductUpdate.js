import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {getProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Brown", "Red", "Blue", "Green", "White", "Pink", "Yellow"],
    color: "",
};

const ProductUpdate = ({ match }) => {
    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
          setValues({ ...values, ...p.data });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Atualizar Produto</h4>
                    {JSON.stringify(values)}
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues} />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;