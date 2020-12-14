import React, {useEffect, useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {createCoupon, getCoupons, removeCoupon} from "../../../functions/coupon";
import {toast} from "react-toastify";
import {DatePicker} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () =>
        getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons();
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`"${res.data.name}" está criado.`);
            })
            .catch((err) => console.log("create coupon err", err));
    };

    const handleRemove = (couponId) => {
        if (window.confirm("Remover?")) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    setLoading(false);
                    loadAllCoupons();
                    toast.error(`Cupom "${res.data.name}" foi removido.`);
                })
                .catch((err) => console.log("create coupon err", err));
        }
    };

    return (
        <div className="contaimer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <h4 className="text-danger">Carregando...</h4>
                    ) : (
                        <h4>Cupom</h4>
                    )}

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
                                onChange={(date) => setExpiry(date)}
                                value={expiry} required
                            />
                        </div>

                        <button className="btn btn-outline-primary">Salvar</button>
                    </form>

                    <br />

                    <h4>{coupons.length} Cupons</h4>

                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Expira Em</th>
                                <th scope="col">Desconto</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}</td>
                                    <td>
                                        <DeleteOutlined 
                                            onClick={() => handleRemove(c._id)}
                                            className="text-danger pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;