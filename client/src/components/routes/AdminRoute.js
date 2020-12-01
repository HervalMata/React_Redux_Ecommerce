import {useSelector} from "react-redux";
import {useState} from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import Route from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
    const {user} = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);
    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                  console.log("CURRENT ADMIN RES", res);
                  setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);
                });
        }
    }, [true]);
    return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;