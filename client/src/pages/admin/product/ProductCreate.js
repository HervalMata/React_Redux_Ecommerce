import React, {useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";

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

    const {
        title, description, price, categories, category,
        shipping, quantity, images, colors, color
    } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        e.preventDefault();
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;