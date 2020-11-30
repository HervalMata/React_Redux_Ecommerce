import React, {useState} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth.
            sendPasswordResetEmail(email, config)
                .then( (t) => {
                    setEmail("");
                    setLoading(false);
                    toast.success("Check seu email para recuparação da senha");
                }).catch((err) => {
                    console.log("ERROR MSG IN FORGOT PASSWORD", err);
                    toast.error(err.message);
                });
    };

    return (

                <div className="col-md-6 offset-md-3 p-5">
                    {loading ? (<h4 className="text-danger">Carregando...</h4> ) : (<h4>Esqueceu a Senha</h4>)}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email" className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite o seu email" autoFocus
                        />
                        <br/>
                        <button
                            className="btn btn-raised"
                            disabled={!email}>
                            Enviar
                        </button>
                    </form>
                </div>
    );
};

export default ForgotPassword;