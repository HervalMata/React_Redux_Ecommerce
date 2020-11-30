import React, {useState} from 'react';
import {toast} from "react-toastify";
import {auth, googleAuthProvider} from "../../firebase";
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {Button} from "antd";
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //console.table(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const  { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            history.push("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.
            signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
                history.push("/");
            }).catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" value={email}
                       onChange={(e) => setEmail(e.target.value)} placeholder="Seu Email" autoFocus />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)} placeholder="Sua Senha" />
            </div>
            <br/>
            <Button
                onClick={handleSubmit} type="primary"
                className="mb-3" block shape="round"
                icon={<MailOutlined />} size="large"
                disabled={!email || !password.length < 6}>
                Login com Email/Senha
            </Button>
            <Link to="/forgot/password" className="float-right text-danger">
                Esqueceu sua senha?
            </Link>
            <br/>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">Carregando...</h4> ) : (<h4>Login</h4>)}
                    {loginForm()}
                    <Button
                        onClick={googleLogin} type="danger"
                        className="mb-3" block shape="round"
                        icon={<GoogleOutlined />} size="large">
                        Login com Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;