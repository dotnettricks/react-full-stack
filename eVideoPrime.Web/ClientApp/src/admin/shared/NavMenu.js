import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import authUser from "../../helpers/authUser";

export default function NavMenu() {
    let navigate = useNavigate();
    const user = authUser.Get();

    let SignOut = () => {
        authUser.Remove();
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
            <div className="container">
                <NavLink to="/" className="navbar-brand"><img src={'/logo.png'} alt="Logo" /> eVideoPrime</NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse d-sm-inline-flex justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="movies">Movies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="users">Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="subscriptions">Subscriptions</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="text-dark nav-link">Welcome: {user.name}</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={SignOut}>SignOut</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}