
import React, {useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Editcat(){

    const [cats, setCats] = useState(null)

    const getCats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getCat')
            setCats(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!cats) {
            getCats()
        }

    }, [])



    function displayCats(cats) {
        if (cats) {
 
            const categories = cats.map(({ id, catName, catDesc, color, products }, key) =>                
                <Link key={key} className="text-black d-flex justify-content-center align-items-center mt-4 border border-dark" style={{backgroundColor:color}} to={"/backend/" + catName + id} onClick={() => window.reload()}>
                    <p className="text-center pt-3"> {catName} </p>
                </Link>
            )
            return (
       
                    categories
             )} else {
            return (<p className="text-center"> Loading....</p>)
        }
    }

    return(
        <>

        <h1 className="text-center">Edit Category</h1>
        {displayCats(cats)}        
        </>
    )
}

export default Editcat;