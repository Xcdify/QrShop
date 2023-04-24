import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Editprod() {
    const [products, setProducts] = useState(null);


    const getProd = async () => {
        try {

            const response = await axios.get('http://localhost:8000/getProd/')
            console.log(response.data)
            setProducts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!products) {
            getProd()
        }

    }, [])

    function displayImg(data) {
        return <img className="mw-50" width={1000} height={200} alt="test" src={`data:image/png;base64,${data}`} />
    }

    function displayProducts(products) {

        if (products) {

            const prods = products.map(({ id, prodCat, prodName, prodImg, price }, key) =>
                <Link key={key} className="w-sm-45 mx-1 my-1 pt-3 d-flex justify-content-center align-items-center flex-direction-column bg-light w-30 " to={'/backend/' + prodName + id}>

                    {displayImg(prodImg)}
                    <p className="pt-2 text-black">{prodName}</p>
                    <p className="text-black">{price + ' kr'}</p>

                </Link>
            )
            return (prods)
        } else {
            return (<p className="text-center"> Loading....</p>)
        }
    }
    return (
        <>

            <h1 className="text-center"> Click on a Product to edit!</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {displayProducts(products)}
            </div>
        </>
    )
}

export default Editprod;