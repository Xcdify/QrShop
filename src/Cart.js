import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [adress, setAdress] = useState(null);
    const [email, setEmail] = useState(null);
    const [number, setNumber] = useState(null);
    var products = '';


    if (!(JSON.parse(sessionStorage.getItem("myCart")))) {
        cart = []
    } else {
        var cart = JSON.parse(sessionStorage.getItem("myCart"));
    }

    function displayImg(data) {
        return <img className="mw-100" width={50} height={50} alt="test" src={`data:image/png;base64,${data}`} />
    }

    function addOne(id) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                cart[i].amount++
                sessionStorage.setItem("myCart", JSON.stringify(cart));
                break
            }
        }
        window.location.reload()
    }

    for (var i = 0; i < cart.length; i++) {
        products += `${cart[i].productName}, Amount : ${cart[i].amount}, Product id : ${cart[i].productId} ||`
    }


    function removeOne(id) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                if (cart[i].amount === 1) {
                    cart.splice(i, 1)
                } else {
                    cart[i].amount--
                }
                sessionStorage.setItem("myCart", JSON.stringify(cart));
                break
            }
        }
        window.location.reload()
    }

    function removeItem(id) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                cart.splice(i, 1)
                break
            }
        }
        sessionStorage.setItem("myCart", JSON.stringify(cart));
        window.location.reload()
    }

    function displayCart() {
        var sumTemp = 0;
        for (var i = 0; i < cart.length; i++) {
            sumTemp += Number(cart[i].productPrice) * cart[i].amount

        }
        if (cart.length > 0) {
            const cartItems = cart.map(({ productId, productName, productImage, productPrice, amount }, key) =>

                <div key={key} className="d-flex bg-light align-items-center w-100" style={{ height: "75px" }}>
                    <p className="w-25 ps-5"> {displayImg(productImage)}</p>
                    <p className="w-25">{productName}</p>
                    <p className="w-25">{productPrice} kr</p>
                    <div className="d-flex w-25">
                        <div className="d-flex w-100 justify-content-center align-items-center">
                            <button className="btn" onClick={() => removeOne(productId)}>-</button>
                            <p className="text-center pt-3">{amount}</p>
                            <button className="btn" onClick={() => addOne(productId)}>+</button>
                        </div>
                        <button className="btn w-50" onClick={() => removeItem(productId)}> Remove all  </button>
                    </div>
                </div>

            )
            return (
                <>
                    <div style={{ minHeight: "225px" }} className="bg-light pt-2">
                        {cartItems}


                    </div>
                    <div className="d-flex bg-light justify-content-center align-items-center w-100" style={{ height: "75px" }}>
                        <p className="text-center font-weight-bold">Your Total is {sumTemp} kr</p>
                    </div>
                </>
            )
        } else {
            return (
                <div style={{ minHeight: "225px" }} className="bg-light">
                    <p className="text-center pt-3"> Your cart is empty</p>
                </div>
            )
        }



    }

    const postOrder = async (e) => {
        e.preventDefault()
        console.log(navigator.onLine)
        if (!navigator.onLine) {
            alert("It seems like you are offline. Please connect to the internet and try again")
            return
        } else {
        
            if(cart.length === 0){
                alert("Your cart is empty please fill your cart with atleast 1 product to place an order")
                return
            }
        
        try {
            await axios.post('http://localhost:8000/postOrder', { name, code, adress, email, number, products })
        }
        catch (err) {
            console.log(err)
        }

        alert('Order has been placed. Payment will be sent to your email shortly')

        sessionStorage.setItem("myCart", JSON.stringify([]));
        window.location.reload()
    }
    }


    return (
        <>
            <h1 className="text-center"> Shopping Cart </h1>
            <h3 className="text-center"> Items in Cart:</h3>

            {displayCart()}

            <form className="w-50 mx-auto mt-4" onSubmit={postOrder}>
                <label for="name" className="form-label">
                    Full Name
                </label>
                <input
                    className="form-control w-100"
                    name="name"
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="d-flex">
                    <div className="d-flex flex-direction-column pe-2 w-100">
                        <label for="code" className="form-label">
                            Zip code
                        </label>
                        <input
                            className="form-control w-100"
                            name="code"
                            id="code"
                            type="number"
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex flex-direction-column ps-2 w-100">
                        <label for="adress" className="form-label">
                            Adress
                        </label>
                        <input
                            className="form-control w-100"
                            name="adress"
                            id="adress"
                            type="text"
                            onChange={(e) => setAdress(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <label for="email" className="form-label">
                    Email
                </label>
                <input
                    className="form-control w-100"
                    name="email"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label for="number" className="form-label">
                    Phone Number
                </label>
                <input
                    className="form-control w-100"
                    name="number"
                    id="number"
                    type="number"
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
                <input type="submit" className="form-control mt-4" value="Place Order" id="online" />
                <button className="btn mt-4 d-none"  id="offline" > You are offline </button>
            </form>
        </>
    )
}

export default Cart;