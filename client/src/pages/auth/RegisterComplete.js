import React, { useState, useEffect } from 'react';
import {auth} from "../../firebase";
import {toast, ToastContainer} from "react-toastify";

const RegisterComplete = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useState(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const completeRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email}
                   onChange={(e) => setEmail(e.target.value)} autoFocus/>
            <input type="password" className="form-control" value={password}
                   onChange={(e) => setPassword(e.target.value)} placeholder="Senha" autoFocus/>
            <button type="submit" className="btn btn-raised">
                Completar Cadastro
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Completar Cadastro</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    );
};
export default RegisterComplete;