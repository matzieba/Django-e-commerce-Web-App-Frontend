import React from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login'
import { ProductList } from '../components/Product/ProductList'
import { ProductForm } from '../components/Product/ProductForm'
import { CartForm } from '../components/Cart/CartForm'



export const Root = () => {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={<ProductList/>}/>
                <Route path='/product/:productId' element={<ProductForm/>}/>
                <Route path='/product/' element={<ProductForm/>}/>
                <Route path='/checkout/' element={<CartForm/>}/>
                <Route path="*" element={<Navigate to='/login'/>}/>
            </Routes>
        </Router>
    );
};
