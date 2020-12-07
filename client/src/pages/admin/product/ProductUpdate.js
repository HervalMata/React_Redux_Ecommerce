import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {getProduct, updateProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {getCategories} from "../../../functions/category";
import {LoadingOutlined} from "@ant-design/icons";
import FileUpload from "../../../components/forms/FileUpload";
import {toast} from "react-toastify";


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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
          setValues({ ...values, ...p.data });
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            setCategories(c.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" está atualizado`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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
        setSelectedCategory(e.target.value);
        if (values.category._id === e.target.value){
            loadProduct();
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Atualizar Produto</h4>
                    )}
                    {/*{JSON.stringify(values)}*/}
                    <div className="p-3">
                        <FileUpload
                            setValues={setValues}
                            setLoading={setLoading}
                            values={values} />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        selectedCaegory={selectedCategory}
                        values={setValues}
                        setValues={setValues} />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;