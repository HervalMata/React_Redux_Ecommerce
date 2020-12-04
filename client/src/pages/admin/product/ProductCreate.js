import React from 'react';
import AdminNav from "../../../components/nav/AdminNav";

const ProductCreate = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    Product Create Form
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;