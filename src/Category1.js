
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";


function Category1({ category, products }) {

    function displayImg(data) {
        return <img className="mw-75" width={1000} height={200} alt="test" src={`data:image/png;base64,${data}`} />
    }


    function displayProducts(products) {

        if (products) {
            const prods = products.map(({ id, prodCat, prodName, prodImg, price, inventory }, key) =>
                <Link key = {key} className="product-container border-2 mx-1 my-1 pt-3 flex justify-content-center align-items-center flex-direction-column bg-light w-30 w-sm-45 " to={'/' + prodCat + '/' + prodName + id}>
                    <p className="bg-primary-200 text-white absolute text-center right-2 top-2 rounded w-6 h-6">{inventory}</p>
                    <p className="pt-2 font-bold text-slate-700 my-4">{prodName}</p>
                    {displayImg(prodImg)}
                    <p className="text-xl w-full text-right mt-4 mr-4 font-bold text-primary-700">{price + ' $'}</p>
                </Link>
            )
            return (prods)
        } else {
            return (<p className="text-center"> Loading....</p>)
        }
    }

    return (
        <>
            <div className="col-lg-10 col-12 overflow-auto">
                <div className="flex w-full m-0 flex-wrap mx-auto ">
                    {displayProducts(products)}
                </div>
            </div>
        </>
    );


}

export default Category1;
