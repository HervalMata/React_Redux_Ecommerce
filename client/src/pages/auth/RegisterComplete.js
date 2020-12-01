import React, { useState, useEffect } from 'react';
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {createOrUpdateUser} from "../../functions/auth";

const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email e senha são requeridos");
            return ;
        }
        if (password.length < 6) {
            toast.error("Senha deve ter pelo menos 6 caracteres");
            return ;
        }
        try {
            const result = await auth.signInWithEmailLink(
                email, window.location.href
            );
            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                console.log("user", user, "idTokenResult", idTokenResult);
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email}
                   onChange={(e) => setEmail(e.target.value)} disabled />
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