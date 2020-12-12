import React, {useEffect, useState} from 'react';
import { getCategory} from "../../functions/category";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((c) => {
            setCategory(c.data);
            console.log(JSON.stringify(c.data, null, 4));
        });
    }, []);

    return <p>{slug}</p>
};

export default CategoryHome;