import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './Navbar';
import Category from './Category';
import Footer from './Footer';
import Category2 from './Category2';
import ProductPage from './ProductPage';
import Addcat from './Addcat';
import Addproduct from './Addproduct';
import Editcat from "./Editcat";
import Editcatsingle from "./Editcatsingle";
import Editprod from "./Editprod";
import Editprodsingle from "./Editprodsingle";
import Cart from "./Cart";
import SideCart from './SideCart'
import { apiUrl } from './helpers/index';


export function App() {

  const [cats, setCats] = useState(null)
  const [products, setProducts] = useState(null);
  const [resetSideCartCheck, setResetSideCartCheck] = useState(false);
  const [testArr, setTestArr] = useState(null)

  useEffect(() => {
    return () => getCats();
  }, [])

  useEffect(() => {
    return () => getProd();
  }, [])

  
  const getCats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getCat`)
      setCats(response.data)
      setTestArr(response.data)
      localStorage.setItem("myCats", JSON.stringify(response.data))
      localStorage.setItem("testArr", JSON.stringify(response.data))
    } catch (err) {
      console.log(err)
    }
  }

  const getProd = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getProd`)
      setProducts(response.data)
      localStorage.setItem("myProds", JSON.stringify(response.data))
    } catch (err) {
      console.log(err)
    }
  }

  function displayCats(arr) {
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].products.length === 0) {
          arr.splice(i, 1)
        }
      }
      const categories = arr.map(({ id, catName, catDesc, color, products }, key) =>
        <Category name={catName} id={id} desc={catDesc} color={color} img1={products[0]} img2={products[1] ? products[1] : products[0]} img3={products[2] ? products[2] : products[0]} />
      )
      return (categories)

    } else {
      return (<p className="text-center"> Loading....</p>)
    }

  }

  function displayLinks(cats) {
    if (cats) {
      const links = cats.map(({ id, catName, products }, key) =>
        <Route key={key} exact path={'/' + catName + id} element={
          <>
            <Navbar />
            <Category2 category={catName} />
            <Footer />
          </>
        } />
      )
      return (
        links
      )
    }
  }

  function displayLinksEdit(cats1) {
    if (cats1) {
      const links = cats1.map(({ id, catName }, key) =>
        <Route key={key} exact path={'/backend/' + catName + id} element={
          <>
            <Editcatsingle id={id} />

          </>
        } />
      )
      return (
        links
      )
    }
  }

  function displayLinksEditProd(prod) {
    if (prod) {
      const links = prod.map(({ id, prodName }, key) =>
        <Route key={key} exact path={'/backend/' + prodName.replaceAll(' ', '%20') + id} element={
          <>

            <Editprodsingle id={id} />

          </>
        } />
      )
      return (
        links
      )
    }
  }

  const resetSideCart = () => {
    setResetSideCartCheck(!resetSideCartCheck)
  }

  function displayLinksProd(products) {
    if (products) {
      const links = products.map(({ id, prodName, prodDesc, price, prodImg, prodCat, inventory }, key) => {
        return (
          <Route key={key} exact path={'/' + prodCat + '/' + prodName.replaceAll(' ', '%20') + id} element={
            <>
              <Navbar />
              <ProductPage id={id} name={prodName} desc={prodDesc} price={price} img={prodImg} catName={prodCat} inventory={inventory} refreshSideCart={resetSideCart}/>
              <Footer />
              <SideCart resetSideCartCheck={resetSideCartCheck}/>
            </>
          } />
        )
      })
      return (
        links
      )
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={
            <div>
              <Navbar />
              {/* {displayCats(JSON.parse(localStorage.getItem("testArr")))} */}
              {products && products.length > 0 && <Category2 category={"OrangeMerchandise"} />}
              <Footer />
              <SideCart />
            </div>

          } />

          {displayLinksEdit(JSON.parse(localStorage.getItem("myCats")))}
          {displayLinks(JSON.parse(localStorage.getItem("myCats")))}


          {displayLinksEditProd(JSON.parse(localStorage.getItem("myProds")))}
          {displayLinksProd(JSON.parse(localStorage.getItem("myProds")))}

          <Route exact path='/backend/add-cat' element={
            <>
              <Addcat />
            </>
          } />
          <Route exact path='/backend/add-product' element={
            <>
              <Addproduct />
            </>
          } />
          <Route exact path='/backend/edit-cat' element={
            <>
              <Editcat />
            </>
          } />
          <Route exact path='/backend/edit-prod' element={
            <>
              <Editprod />
            </>
          } />
          <Route exact path="/cart" element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>

          } />

        </Routes>
      </Router>

    </>
  );
}
