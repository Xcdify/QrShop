import axios from "axios";
import React,{useState} from "react";

function Addcat() {
    const [catName, setCatName] = useState(null);
    const [catDesc, setCatDesc] = useState(null);
    const [color, setColor] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
    
            await axios.post('http://localhost:8000/postCat', { catName, catDesc, color})
          
    
        } catch (err) {
          console.log(err)
        }
    
      }


    return (
        <>
        <div className="d-flex align-items-center flex-direction-column w-100">

            <h1 className="mb-3 text-center"> Add Category Page</h1>
            <h3 className="mb-3 text-center"> Use this page to add a category to the webshop</h3>

            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <label for="catName" className="form-label">
                    Category Name
                </label>
                <input
                    className="form-control"
                    name="catName"
                    id="catName"
                    type="text"
                    onChange={(e)=> setCatName(e.target.value)}
                />
                <label for="catDesc" className="form-label">
                    Category Description
                </label>
                <textarea
                    className="form-control"
                    name="catDesc"
                    id="catDesc"
                    type="text"
                    rows="3"
                    onChange={(e)=> setCatDesc(e.target.value)}
                />
                <label for="catColor" className="form-label">
                    Choose a Category Color
                </label>

                <select class="form-select" aria-label="Default select example" id="catColor" onChange={(e)=> setColor(e.target.value)}>
                    <option value="0" className="bg-light">Pick a Color</option>
                    <option value="Red" className="bg-red">Red </option>
                    <option value="Orange" className="bg-orange">Orange </option>
                    <option value="Yellow" className="bg-yellow">Yellow</option>
                    <option value="Green" className="bg-green">Green </option>
                    <option value="Blue" className="bg-blue text-white">Blue </option>
                    <option value="Indigo" className="bg-indigo text-white">Indigo</option>
                    <option value="Violet" className="bg-violet">Violet</option>
                </select>
                <input type="submit" className="form-control mt-4" />
            </form>
            </div>
        </>
    );
}

export default Addcat;
