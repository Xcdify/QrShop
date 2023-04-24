import { BsCart4 } from "react-icons/bs";
import "./index.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import caddyBlack  from "./assets/caddy-black.svg";

function Navbar() {
  window.addEventListener('online', handleConnection);
  window.addEventListener('offline', handleConnection);

  function handleConnection() {
    if (navigator.onLine) {
      document.getElementById('status').innerText = "Online"
    } else {
      document.getElementById('status').innerText = "offline"
    }
  }

  function displayCart() {
    if (cart) {
      var sum = 0;
      var cartArr = JSON.parse(cart)
      for (var i = 0; i < cartArr.length; i++) {
        sum = sum + cartArr[i].amount

      }
      return sum
    }
    else {
      return '0'
    }
  }

  var cart = sessionStorage.getItem("myCart");

  return (
    <div className="bg-light mb-10">
      <div className="container">
        <div className='flex justify-content-between' style={{ height: "80px" }} >
          <div className="flex justify-content-center align-items-center" >
            <Link to='/' className="text-black">
              <h2 className="mx-10">Fitness Store</h2>
            </Link>
          </div>
          <div className="flex w-25 align-items-center justify-content-center flex-direction-column">
            <Search />
          </div>
          <div className="flex align-items-center justify-content-center">
            <img src={caddyBlack} className="flex w-10 h-10"/>
            <div className="flex flex-direction-column justify-content-center align-items-center pe-5">
              <Link to="/cart" className="border-2 text-black p-2 px-4 w-100">{displayCart()}</Link>
            </div>
          </div>
          <p className="text-center" id="status"> </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;