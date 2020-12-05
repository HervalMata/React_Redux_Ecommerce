import React, {useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createProduct} from "../../../functions/product";
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
}

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state }));

    const {
        title, description, price, categories, category,
        shipping, quantity, images, colors, color
    } = values;

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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    Cadastro de Produto
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Titulo</label>
                            <input
                                type="text"  name="title"
                                className="form-control"
                                value={title} onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Descrição</label>
                            <input
                                type="text"  name="description"
                                className="form-control"
                                value={description} onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Preço</label>
                            <input
                                type="number"  name="price"
                                className="form-control"
                                value={price} onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Entrega</label>
                            <select
                                name="shipping"
                                className="form-control"
                                value={title} onChange={handleChange}
                            >
                                <option>Por favor selecione</option>
                                <option value="No">Não</option>
                                <option value="Yes">Sim</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input
                                type="number"  name="quantity"
                                className="form-control"
                                value={quantity} onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cor</label>
                            <select
                                name="color"
                                className="form-control"
                                value={title} onChange={handleChange}
                            >
                                <option>Por favor selecione</option>
                                {colors.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-outline-info">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;