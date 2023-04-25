import React, { useState, useEffect } from "react";
import axios from "axios";

function SideCart() {
    const [name, setName] = useState(null);
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState([]);
    const [code, setCode] = useState(null);
    const [adress, setAdress] = useState(null);
    const [email, setEmail] = useState(null);
    const [number, setNumber] = useState(null);
    var products = '';

    useEffect(() => {
        const setValues = () => {
            if (!(JSON.parse(sessionStorage.getItem("myCart")))) {
                cart = []
                setCart(cart)
            } else {
                var cart = JSON.parse(sessionStorage.getItem("myCart"));
                setCart(cart)
                getSum(cart);
            }
        }
        setValues();
    }, [])

    function displayImg(data) {
        return <img className="mw-100" width={50} height={50} alt="test" src={`data:image/png;base64,${data}`} />
    }

    function getSum(cart){
        var sum = cart.reduce(function(_this, val) {
            return _this + val.amount*+val.productPrice
        }, 0);
        setTotal(sum);
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
                setCart([...cart])
                getSum(cart);
                sessionStorage.setItem("myCart", JSON.stringify(cart));
                window.location.reload()
                break
            }
        }
    }

    function removeItem(id) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId === id) {
                cart.splice(i, 1)
                break
            }
        }
        setCart([...cart])
        getSum(cart);
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

            if (cart.length === 0) {
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
        <div className="fixed">
            <div className="absolute">
                <div className="fixed inset-y-0 right-0 flex max-w-full pl-2">
                    <div className="w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                    <div className="ml-3 flex h-7 items-center">
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {cart && cart.map((car, key) => {
                                                return <li key = {key} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={`data:image/png;base64,${car.productImage}`} alt={''} className="h-full w-full object-cover object-center" />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3 className="text-primary-100">
                                                                    {car.productName}
                                                                </h3>
                                                                <p className="ml-4">${car.productPrice}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty {car.amount}</p>
                                                            <div className="flex">
                                                                <button type="button" onClick={() => removeOne(car.productId)} className="font-medium text-primary-600 hover:text-primary-500">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            })}
                                            {cart.length == 0 && 
                                                <div className="flex h-96 justify-center self-center content-center items-center">
                                                    <p className="text-slate-400">No products</p>
                                                </div>
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${total}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700">Checkout</a>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                              <button type="button" className="font-medium text-primary-600 hover:text-primary-500">
                                            Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideCart;