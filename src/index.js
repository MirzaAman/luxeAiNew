import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'

// screens
import Products from './screens/Products';
import AdminProducts from './screens/Admin/AdminProducts';
import AiScreen from './screens/AiScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<AiScreen />} path='/' />
        <Route element={<Products />} path='/products' />
        <Route element={<AdminProducts />} path='/admin/products' />
        </Routes>
    </Router>
  </React.StrictMode>
);
