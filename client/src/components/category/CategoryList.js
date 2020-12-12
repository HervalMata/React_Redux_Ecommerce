import React, {useEffect, useState} from 'react';
import {getCategories} from "../../functions/category";
import {Link} from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((c) => {
            setCategories(c.data);
            setLoading(false);
        });
    }, []);

    const showCategories = () => {
        categories.map((c) => (
            <div key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/category/${c.slug}`}>
                    {c.name}
                </Link>
            </div>
        ));
    };

    return (
        <div className="container">
            {loading ? (
                <h4 className="text-center">Carregando...</h4>
            ) : (
                showCategories()
            )}
        </div>
    );
};

export default CategoryList;