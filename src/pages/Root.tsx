import React from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login'
import { ProductList } from '../components/Product/ProductList'



export const Root = () => {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={<ProductList/>}/>
                <Route path="*" element={<Navigate to='/login'/>}/>
            </Routes>
        </Router>
    );
};
