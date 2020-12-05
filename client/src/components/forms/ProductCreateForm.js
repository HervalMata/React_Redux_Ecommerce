import React from 'react';

const ProductCreateForm = ({ handleSubmit, handleChange, handleCategoryChange, setValues, values }) => {
    const {
        title, description, price, categories, category,
        shipping, quantity, images, colors, color
    } = values;

    return (
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
                    onChange={handleChange}
                >
                    <option>Por favor selecione</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Categoria</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                >
                    <option>Por favor selecione</option>
                    {categories.length > 0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-outline-info">Salvar</button>
        </form>
    );
};

export default ProductCreateForm;