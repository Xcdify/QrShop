
import React, { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  
  } from "react-router-dom";
  
function Category({ id, name, desc, color, img1, img2, img3 }) {

    function displayImg (data) {
       return <img className="mx-3 border-4 w-25" alt="test" src={`data:image/png;base64,${data}`} />
    } 

    function loading(item){
        if(item){
           return displayImg(item.prodImg)
        }
        return <p className="text-center"> Loading ...</p>
    }
    var products = JSON.parse(sessionStorage.getItem("myProds"));


    for(var i = 0; i < products.length ;i++){
        if(products[i].id === img1){
            var image = products[i]
        }
        if(products[i].id === img2){
            var image1 = products[i]
        }
        if(products[i].id === img3){
            var image2 = products[i]
        }
    }



    return (
        <div className="container mt-4">
            <div className='flex flex-direction-column bg-slate-100 w-100 h-100 p-4'>
                <div className="flex w-100">
                    <p className="text-xl text-primary-100">{name}</p>
                </div>
                <div className="flex w-md-50 w-100 mb-4">
                    <p className="text-4xl text-slate-700">{desc}</p>
                </div>
                <div className="flex flex-direction-column-sm justify-content-evenly align-items-center w-100 h-75">
                    <div className="flex w-md-50 w-100 flex-direction-column-sm justify-content-end align-items-center h-75">
                        <div className="flex justify-content-center w-100 w-md-75 h-100">
                            {loading(image)}
                            {loading(image1)}
                            {loading(image2)}
                        </div>
                    </div>
                </div>
                <div className="flex w-100 mt-4">
                    <Link className="link" to={"/" + name + id}>
                        <div className="flex bg-primary-100 text-white p-2 justify-content-center justify-content-lg-start align-items-center text-black h-100">View More</div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Category;
