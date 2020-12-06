import React from 'react';
import {useSelector} from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";

const ProductUpdate = ({ match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = match.params;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Atualizar Produto</h4>
                    {JSON.stringify(slug)}
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;