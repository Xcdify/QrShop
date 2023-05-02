import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQRCode } from 'next-qrcode';
import {apiUrl} from './helpers/index';

function SideCart() {
      
    const { Canvas } = useQRCode();

    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState({
        products: [],
        subtotal: 0
    });
    const [cartId, setCartId] = useState(null);
    var products = '';

    useEffect(() => {
        const setValues = async () => {
          try {
            const cartId = await sessionStorage.getItem("cartId");
            if(cartId){
                setCartId(cartId)
                const response = await axios.get(`${apiUrl}/cart/${cartId}`);
                setCart(response.data);
            }
          }
          catch (err) {
            console.log(err)
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

    async function removeItem(productId) {
        try {
            const cartId = await sessionStorage.getItem("cartId");
            if(cartId){
                await axios.delete(`${apiUrl}/cart/${cartId}/product/${productId}`);
            }
        }
        catch (err) {
            console.log(err)
        }
        window.location.reload()
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
                                            {cart && cart.products.map((car, key) => {
                                                return <li key = {key} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={`data:image/png;base64,${car.prodImg}`} alt={''} className="h-full w-full object-cover object-center" />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3 className="text-primary-100">
                                                                    {car.prodName}
                                                                </h3>
                                                                <p className="ml-4">${car.price}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty {car.quantity}</p>
                                                            <div className="flex">
                                                                <button type="button" onClick={() => removeItem(car.productId)} className="font-medium text-primary-600 hover:text-primary-500">Remove</button>
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
                                    <p>${cart.subtotal}</p>
                                </div>
                                {cartId && <p className="mt-0.5 text-center text-sm text-gray-500">Scan to checkout.</p>}
                                {cartId && <div className="flex items-center justify-center mt-8">
                                    <Canvas
                                        text={`http://localhost:3002/order/${cartId}`}
                                        options={{
                                            level: 'M',
                                            margin: 3,
                                            scale: 4,
                                            width: 180,
                                            color: {
                                            dark: '#000',
                                            light: '#f16e00',
                                            },
                                        }}
                                    />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideCart;