import React from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login'


export const Root = () => {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path="*" element={<Navigate to='/'/>}/>
            </Routes>
        </Router>
    );
};
