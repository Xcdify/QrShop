import { useEffect, useState } from "react";
import {
  RiStarFill,
  RiStarHalfFill,
  RiStarLine
} from "react-icons/ri";
import axios from "axios";
import SideCart from './SideCart'

function ProductPage({ id, name, desc, price, img, inventory, catName }) {

  const [fromQr, setFromQr] = useState(false);

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
  if (!(JSON.parse(sessionStorage.getItem("myCart")))) {
    cart = []
  } else {
    var cart = JSON.parse(sessionStorage.getItem("myCart"));
  }

  const handleCart = async (type) => {
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productId === id) {
          if(type !== "once"){
            cart[i].amount++
            break
          }
        } else {
          var cartItem = {
            productId: id,
            productName: name,
            productImage: img,
            productPrice: price,
            amount: 1
          }
          cart.push(cartItem)
          break

        }
      }
    } else {
      var cartItem = {
        productId: id,
        productName: name,
        productImage: img,
        productPrice: price,
        amount: 1
      }
      cart.push(cartItem)
    }
    sessionStorage.setItem("myCart", JSON.stringify(cart));
    if(type !== "once"){
      window.location.reload()
    }
  }

  function getCart() {
    var test = sessionStorage.getItem("myCart");
    console.log(JSON.parse(test));
  }

  const handleBuy = async () => {
    const object = {
      inventory: inventory - 1
    }
    try {
      await axios.put(`http://localhost:8000/updateProdInventory/${id}`, object)
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
              {fromQr && <button className="p-2 text-white bg-primary-100 w-75" onClick={handleBuy}> Buy Now</button>}
              {!fromQr && <button className="p-2 text-white bg-primary-100 w-75" onClick={handleCart}> Add to cart</button>}
            </div>
          </div>
        </div>

        {cart && <SideCart/>}
      </div>
    </div>
  );
}

export default ProductPage;
