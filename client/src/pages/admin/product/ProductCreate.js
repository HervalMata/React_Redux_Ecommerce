import React, {useEffect, useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createProduct} from "../../../functions/product";
import {toast} from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories} from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

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

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).then((res) => {
            console.log(res);
            window.alert(`"${res.data.title}" está criado`);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            //if (err.response.status === 400) toast.error(err.response.data);
            toast.error(err.response.data.err);
        });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CATEGORIA CLICADA", e.target.value);
        setValues({ ...values, category: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    Cadastro de Produto
                    <hr />

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        setValues={setValues}
                        values={values}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;