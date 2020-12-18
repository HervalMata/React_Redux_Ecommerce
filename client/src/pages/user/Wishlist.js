import React, {useEffect, useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector} from "react-redux";
import {getWishlist} from "../../functions/user";
import {removeFromWishlist} from "../../../../server/controllers/user";
import {Link} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeFromWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col">
                    <h4>Lista de Desejos</h4>

                    {wishlist.map((p) => (
                        <div key={p._id}>
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"
                                >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Wishlist;