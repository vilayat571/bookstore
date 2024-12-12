import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import Notfound from "./pages/Notfound";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";

/* 
KeyPoints
1. Adding not found page
2. Adding HelmetProvide for the SEO component
*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path={`*`} element={<Notfound />} />
            <Route path={`/login`} element={<Login />} />
            <Route path={`/cart`} element={<Cart />} />
            <Route path={`/products`} element={<ProductPage />} />
            <Route path={`/products/:id`} element={<SingleProduct />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
