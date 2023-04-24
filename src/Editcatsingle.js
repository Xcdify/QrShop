import React, { useState, useEffect } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom";

function Editcatsingle({ id }) {
    const [cats, setCats] = useState(null)
    const [catName, setCatName] = useState('loading ...');
    const [catDesc, setCatDesc] = useState('loading ...');
    const [color, setColor] = useState('loading ...');
    const [filteredArray, setFilteredArray] = useState([1, 2, 3])
    var refresh = false
    let navigate = useNavigate()

    const getCats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getCat/' + id)
            setCats(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!cats) {
            getCats()
        }
        
        if(cats){
            if(catName === "loading ..."){
                setColor(cats[0].color)
                setCatDesc(cats[0].catDesc)
                setCatName(cats[0].catName)
            }
        }
  
    }, [cats])




    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.put('http://localhost:8000/updateCat/' + id, { catName, catDesc, color})
            return navigate("/backend/edit-cat")
            
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async(e) =>{
        e.preventDefault()

        try{

            await axios.delete('http://localhost:8000/deleteCat/' + id)
            return navigate("/backend/edit-cat")

        }catch(err){
            console.log(err)
        }
        
    }

    return (
        <>
            <h1 className="mb-3 text-center"> Edit Category Page</h1>
            <h3 className="mb-3 text-center"> Use this page to edit existing categories in the webshop</h3>

            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="catName" className="form-label">
                    Category Name
                </label>
                <input
                    className="form-control"
                    name="catName"
                    id="catName"
                    type="text"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
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
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                />
                <label for="catColor" className="form-label">
                    Choose a Category Color
                </label>

                <select className="form-select" aria-label="Default select example" id="catColor" onChange={(e) => setColor(e.target.value)} >
                    <option value={color} className="bg-light">{color}</option>
                    <option value="Red" className="bg-red">Red </option>
                    <option value="Orange" className="bg-orange">Orange </option>
                    <option value="Yellow" className="bg-yellow">Yellow</option>
                    <option value="Green" className="bg-green">Green </option>
                    <option value="Blue" className="bg-blue text-white">Blue </option>
                    <option value="Indigo" className="bg-indigo text-white">Indigo</option>
                    <option value="Violet" className="bg-violet">Violet</option>
                </select>
                <input type="submit" className="form-control mt-4" />
                <button className="btn border border-dark w-100 mt-4 mx-auto" onClick={handleDelete}> DELETE </button>
            </form>
        </>
 
    )
}

export default Editcatsingle