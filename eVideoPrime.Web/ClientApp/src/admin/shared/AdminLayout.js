import React from 'react';
import { Outlet, useLocation, Navigate, Routes, Route } from 'react-router-dom';

import NavMenu from './NavMenu';

import Dashboard from '../../admin/containers/Dashboard';
import Movies from '../../admin/containers/Movies';
import Movie from '../../admin/containers/Movie';

import authUser from "../../helpers/authUser";
import MovieBanner from '../containers/MovieBanner';
import Users from '../containers/Users';
import Subscriptions from '../containers/Subscriptions';

export default function AdminLayout() {
    const isAuthenticated = authUser.IsAuth();
    let location = useLocation();
    return (
        isAuthenticated ? <div>
            <NavMenu />
            <div className="container">
                <Outlet />
                <Routes>
                    <Route exact index element={<Dashboard />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/subscriptions" element={<Subscriptions />}></Route>
                    <Route path="/movie/create" element={<Movie />}></Route>
                    <Route path="/movie/edit/:id" element={<Movie />}></Route>
                    <Route path="/movie/banner/:id" element={<MovieBanner />}></Route>
                </Routes>
            </div>
        </div> : <Navigate to="/login" state={{ from: location }} />
    )
}
