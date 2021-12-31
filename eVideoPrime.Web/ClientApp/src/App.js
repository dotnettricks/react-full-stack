import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import Layout from './shared/Layout';
//lazy loading
const UserLayout = lazy(() => import('./user/shared/UserLayout'));
const AdminLayout = lazy(() => import('./admin/shared/AdminLayout'));

//Components: PascalCase
//method/functions and properties/variable: camelCase
//directory: lowercase
//https://github.com/airbnb/javascript/tree/master/react

export default function App() {
    return (
        <Routes>
            <Route path='/user/*' element={
                <Suspense fallback={<>Loading...</>}> <UserLayout /> </Suspense>} >
            </Route>
            <Route path='/admin/*' element={
                <Suspense fallback={<>Loading...</>}> <AdminLayout /> </Suspense>} >
            </Route>
            <Route path='/*' element={<Layout />} ></Route>
        </Routes>
    );
}
