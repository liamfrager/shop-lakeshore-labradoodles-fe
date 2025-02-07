import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartRoute from './routes/CartRoute';
import ProductRoute from './routes/ProductRoute';
import HomeRoute from './routes/HomeRoute';
import OrderSuccessRoute from './routes/OrderSuccessRoute';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='' element={<HomeRoute />} />
                    <Route path='product/:id' element={<ProductRoute />} />
                    <Route path='cart' element={<CartRoute />} />
                    <Route path='success' element={<OrderSuccessRoute />} />

                    {/* <Route path='webhooks' element={<WebhookHandler />}/> */}
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;