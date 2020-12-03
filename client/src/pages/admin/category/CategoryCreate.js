import React, {useEffect, useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/category";
import {toast} from "react-toastify";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" está criado`);
                loadCategories();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Remover?")){
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    setName("");
                    toast.success(`"${res.data.name}" removido`);
                    loadCategories();
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }


    };

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nome</label>
                <input
                    type="text" className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name} autoFocus required
                />
                <br/>
                <button className="btn btn-outline-primary">Salvar</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Carregando...</h4>
                    ) : (
                        <h4>Cadastrar Categoria</h4>
                    )}
                    {categoryForm()}
                    <hr />
                    {categories.map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;