import React from "react";

import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import CreateUser from "./Views/CreateUser"
import UserList from "./Views/UserList";
import DetailUser from"./Views/DetailUser";
import DetailProduct from "./Views/DetailProduct";
import Homepage from "./Views/Homepage";
import EditProduct from "./Views/Editproduct.js";

import Footer from"./Components/Footer";
import Navbar from "./Components/Navbar"; 

import Product from"./Views/Product";
import CartProduct from "./Views/CartProduct";
// import Cart from "./Cart";


    function App() {
      return (
        <div>
          <BrowserRouter basename='/'>
              <Navbar appTitle='IARC Devboard' />
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/create' element={<CreateUser />} />
              <Route path='/UserList' element={<UserList />} />
              <Route path='/detail/:id' element={<DetailUser />} />
              <Route path='/product' element={<Product />} />
              <Route path='/DetailProduct' element={<DetailProduct />} />
              <Route path='/Product/Edit/:id' element={<EditProduct />} />
              {/* <Route path='/Product/Delete/:id' element={<DeleteProduct />} /> */}
              <Route path="/cart" element={<CartProduct />} />
              {/* <Route path="/cart" element={<Cart />} />   */}
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      );
    }
    
    
    export default App;