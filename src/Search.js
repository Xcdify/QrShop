import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom"
function Search() {


    var products = JSON.parse(sessionStorage.getItem("myProds"))
    const [search, setSearch] = useState("")


    const [result, setResults] = useState([]);

    useEffect(() => {
        if (products) {
            let tempArr = []
            for (var i = 0; i < products.length; i++) {
                for (var j = 0; j <= products[i].prodName.length - search.length; j++) {
                    let temp = products[i].prodName.substring(j, j + search.length)
                    if (temp.toLowerCase() === search.toLowerCase()) {
                        tempArr.push({ name: products[i].prodName, id: products[i].id, prodCat: products[i].prodCat })
                        break
                    }
                }
            }
            setResults(tempArr)
            document.getElementById('search-results').classList.remove('d-none')
        }

    }, [search])


    const displaySearch = (results) => {
        const output = results.map(({ name, id, prodCat }, key) =>
        (
            <Link key={key} to={'/' + prodCat + '/' + name.replaceAll(' ', '%20') + id} className="text-center text-black">
                <p> {name} </p>
            </Link>
        )
        )
        return (output)
    }

    useEffect(() => {
        window.onclick = function (e) {
            if (!(e.target.id === 'mySearch') && !(e.target.id === "search-results")) {
                var mySearch = document.getElementById("search-results");
                if (!mySearch.classList.contains('d-none')) {
                    mySearch.classList.add('d-none');
                }
            }
        }

    })


    return (
        <>
            <div className="flex w-100 justify-content-center flex-direction-column align-items-center mySearch">
                <input
                    className="text-center h-10 w-100 border-2 w-sm-100"
                    type="search"
                    placeholder="Search here"
                    onChange={(e) => setSearch(e.target.value)}
                    id={'mySearch'}
                />
                <div className="d-none bg-light w-33 position-absolute w-sm-100 overflow-auto " style={{ height: "200px", top: "180px" }} id="search-results">
                    {

                        displaySearch(result)

                    }
                </div>
            </div>
        </>
    )
}

export default Search;