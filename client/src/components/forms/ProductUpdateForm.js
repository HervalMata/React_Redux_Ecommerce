import React from 'react';
import {Select} from "antd";
const { Option } = Select;

const ProductUpdateForm = ({ handleSubmit, handleChange, handleCategoryChange, setValues, values, categories, selectedCategory, colors }) => {
    const {
        title, description, price, category,
        shipping, quantity, images, color
    } = values;

    const Colors = {
        Brown : {
            id: "Brown",
            name: "Brown",
        },
        Red: {
            id: "Red",
            name: "Red",
        },
        Blue: {
            id: "Blue",
            name: "Blue",
        },
        Green: {
            id: "Green",
            name: "Green",
        },
        White: {
            id: "White",
            name: "White",
        },
        Pink: {
            id: "Pink",
            name: "Pink",
        },
        Yellow: {
            id: "Yellow",
            name: "Yellow",
        },
    };

    return <form onSubmit={handleSubmit}>
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
                value={shipping === "Yes" ? "Yes" : "No"}
                onChange={handleChange}
            >
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
                value={color}
                name="color"
                className="form-control"
                onChange={handleChange}
            >
                {/*<option>Por favor selecione</option>*/}
                {Object.keys(Colors).map((c) => (
                    <option
                         key={c}
                         value={c}
                    >
                        {Colors[c].name}
                    </option>
                    ))}
            </select>
        </div>
        <div className="form-group">
            <label>Categoria</label>
            <select
                name="category"
                className="form-control"
                onChange={handleCategoryChange}
                value={selectedCategory ? selectedCategory : category}
            >
                <option>{category ? category.name : "POr favor selecione"}</option>
                {categories.length > 0 && categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
        </div>
        <button className="btn btn-outline-info">Salvar</button>
    </form>;
};

export default ProductUpdateForm;