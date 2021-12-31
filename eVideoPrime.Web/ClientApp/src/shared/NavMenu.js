import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import authUser from '../helpers/authUser';

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
                            <NavLink className="nav-link" to="/">Movies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {
                            user == null ? <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                                </li>
                            </>
                                : <>
                                    <li className="nav-item">
                                        {
                                            user.roles.indexOf('Admin') > -1 ? <NavLink to="/admin" className="text-dark nav-link">Welcome: {user.name}</NavLink>
                                                : <NavLink to="/user" className="text-dark nav-link">Welcome: {user.name}</NavLink>
                                        }
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="" onClick={SignOut}>SignOut</a>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}