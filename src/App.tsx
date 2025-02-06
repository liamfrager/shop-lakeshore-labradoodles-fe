import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartRoute from './routes/CartRoute';
import ProductRoute from './routes/ProductRoute';
import HomeRoute from './routes/HomeRoute';
import OrderSuccessRoute from './routes/OrderSuccessRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<HomeRoute />} />
                <Route path='product/:product_id' element={<ProductRoute />} />
                <Route path='cart' element={<CartRoute />} />
                <Route path='order_success' element={<OrderSuccessRoute />} />

                {/* <Route path='stripe_webhooks' /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;