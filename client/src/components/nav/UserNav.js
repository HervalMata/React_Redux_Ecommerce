import React from 'react';
import {Link} from "react-router-dom";

const UserNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">
                    Histórico
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    Senha
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/user/wishlist" className="nav-link">
                    Lista de desejos
                </Link>
            </li>
        </ul>
    </nav>
);

export default UserNav;