import React from 'react';
import { Outlet, useLocation, Navigate, Routes, Route } from 'react-router-dom';

import NavMenu from './NavMenu';

import Dashboard from '../../user/containers/Dashboard';
import Payments from '../../user/containers/Payments';

function getAuth() {
    let userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    return user ? true : false;
}

export default function UserLayout() {
    let isAuthenticated = getAuth();
    let location = useLocation();
    return (
        isAuthenticated ? <div>
            <NavMenu />
            <div className="container">
                <Outlet />
                <Routes>
                    <Route exact index element={<Dashboard />}></Route>
                    <Route path="payments" element={<Payments />}>
                    </Route>
                </Routes>
            </div>
        </div> : <Navigate to="/login" state={{ from: location }} />
    )
}
