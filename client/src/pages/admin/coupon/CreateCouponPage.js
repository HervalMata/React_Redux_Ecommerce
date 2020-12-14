import React, {useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createCoupon} from "../../../functions/coupon";
import {toast} from "react-toastify";
import {DatePicker} from "antd";

const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`"${res.data.name}" está criado.`);
            })
            .catch((err) => console.log("create coupon err", err));
    };

    return (
        <div className="contaimer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Cupom</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Nome</label>
                            <input
                                type="text" className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name} autoFocus required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Desconto %</label>
                            <input
                                type="text" className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount} required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Expira Em</label>
                            <br />
                            <DatePicker
                                className="form-control" selected={new Date()}
                                onChange={(e) => setExpiry(date)}
                                value={expiry} required
                            />
                        </div>

                        <button className="btn btn-outline-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;