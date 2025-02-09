import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartRoute from './routes/CartRoute';
import ProductRoute from './routes/ProductRoute';
import ProductsRoute from './routes/ProductsRoute';
import OrderSuccessRoute from './routes/OrderSuccessRoute';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Content from './components/ui/Content';

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div className='app-container'>
                    <Header />
                    <Content>
                        <Routes>
                            <Route path='/products' element={<ProductsRoute />} />
                            <Route path='products/:id' element={<ProductRoute />} />
                            <Route path='cart' element={<CartRoute />} />
                            <Route path='success' element={<OrderSuccessRoute />} />

                            {/* <Route path='webhooks' element={<WebhookHandler />}/> */}
                        </Routes>
                    </Content>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;