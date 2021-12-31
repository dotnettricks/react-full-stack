import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';

import NavMenu from './NavMenu';

import Movie from '../containers/Movie';
import Pricing from '../containers/Pricing';
import Home from '../containers/Home';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import NotFound from "../containers/NotFound";
import Order from '../containers/Order';
import Receipt from '../containers/Receipt';
import Player from '../containers/Player';

export default function Layout() {
    return (
        <div>
            <NavMenu />
            <div className="container">
                <Outlet />
                <Routes>
                    <Route exact index element={<Home />}></Route>
                    <Route path="movie/:id" element={<Movie />}></Route>
                    <Route path="movie/player/:id" element={<Player />}></Route>
                    <Route path="pricing" element={<Pricing />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="order" element={<Order />}></Route>
                    <Route path="receipt" element={<Receipt />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    );
}
