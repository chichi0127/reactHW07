import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products"
import SingleProduct from "./views/front/SingleProduct"
import Cart from "./views/front/Cart"
import NotFound from "./views/front/NotFound"
import BackendLayout from "./layout/BackendLayout";
import HomeBack from "./views/back/HomeBack";
import ProductsBack from "./views/back/ProductsBack"
import Checkout from "./views/front/Checkout";
import Login from "./views/front/Login";
import OrderBack from "./views/back/OrderBack"



export const router = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,//預設為首頁
                element: <Home />,
            },
            {
                path: 'product',
                element: <Products />,
            },
            {
                path: 'product/:id',
                element: <SingleProduct />,

            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'checkout',
                element: <Checkout />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/admin',
        element: <BackendLayout />,
        children: [
            {
                index: true,
                element: <HomeBack />,
            },
            {
                path: 'product',
                element: <ProductsBack />,
            },
            {
                path: 'order',
                element: <OrderBack />,
            },

        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);