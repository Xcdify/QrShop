import { useEffect, useState } from "react";
import {
  RiStarFill,
  RiStarHalfFill,
  RiStarLine
} from "react-icons/ri";
import axios from "axios";
import SideCart from './SideCart'
import {apiUrl} from './helpers/index';

function ProductPage({ id, name, desc, price, img, catName, inventory }) {

  const [fromQr, setFromQr] = useState(false);
  const [cart, setCart] = useState({
    products: [],
    subtotal: 0
  });
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const setValues = async () => {
      try {
        const cartId = await sessionStorage.getItem("cartId");
        if(cartId){
            setCartId(cartId);
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

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const fromQr = params.get('fromQr');
    setFromQr(fromQr)
    if(fromQr == "true"){
      handleCart("once");
    }
  }, [])

  function displayImg(data) {
    return <img className="mw-100" width={1000} height={600} alt="test" src={`data:image/png;base64,${data}`} />
  }

  const handleCart = async (type) => {
    if (cart.products.length > 0) {
      const productIndex = cart.products.findIndex((product) => {
        return product.productId === id
      })
      if(productIndex >= 0){
        if (type !== "once") {
          cart.products[productIndex].quantity++;
        }
      }else{
        var product = {
          productId: id,
          cartId: cartId,
          price: price,
          quantity: 1
        }
        cart.products.push(product)
      }
      try {
        cart.subtotal = getSum(cart.products)
        let response = await axios.put(`${apiUrl}/cart/${cartId}`, cart)
        console.log(response)
      }
      catch (err) {
        console.log(err)
      }
    } else {
      var product = {
        productId: id,
        price: +price,
        quantity: 1
      }
      products.push(product)
      const cart = {
        products: products,
        subtotal: getSum(products)
      }
      try {
        let response = await axios.post(`${apiUrl}/postCart`, cart)
        console.log(response)
        sessionStorage.setItem("cartId", response.data.cartId);
      }
      catch (err) {
        console.log(err)
      }
    }
    if (type !== "once") {
      window.location.reload()
    }
  }

  function getSum(products){
    var sum_of_products = products.reduce(function(_this, val) {
        return _this + val.quantity*+val.price
    }, 0);
    return sum_of_products;
  }

  const handleBuy = async () => {
    const object = {
      inventory: inventory - 1
    }
    try {
      await axios.put(`${apiUrl}/updateProdInventory/${id}`, object)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='mr-48'>

      <div className='flex'>
        <div className=" w-3/4 flex flex-direction-column-sm justify-content-center align-items-center">
          <div className="w-md-50 w-100 p-5">
            {displayImg(img)}
          </div>
          <div className="w-md-50 w-100 bg-light h-100 p-5 mt-5">
            <div className="w-full d-flex flex-direction-column align-items-center">
              <h2 className="text-center text-primary-100">{catName}</h2>
              <h3 className="text-center"> {name} </h3>
              <div className="d-flex w-full justify-content-center pt-3">
                <RiStarFill color={'#f16e00'} size={30} />
                <RiStarFill color={'#f16e00'} size={30} />
                <RiStarFill color={'#f16e00'} size={30} />
                <RiStarHalfFill color={'#f16e00'} size={30} />
                <RiStarLine color={'#f16e00'} size={30} />
              </div>
              <p className="pt-3">
                {desc}
              </p>
              <p className="text-center text-lg font-bold text-primary-100">{price} $</p>
              {fromQr && <button className="p-2 text-white bg-primary-100 w-75" onClick={() => handleBuy()}> Buy Now</button>}
              {!fromQr && <button className="p-2 text-white bg-primary-100 w-75" onClick={() => handleCart()}> Add to cart</button>}
            </div>
          </div>
        </div>

        {cart && <SideCart/>}
      </div>
    </div>
  );
}

export default ProductPage;
