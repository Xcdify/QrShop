import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {apiUrl} from './helpers/index';

function Editprodsingle({ id }) {
    const [prodCat, setProdCat] = useState("loading ...");
    const [prodName, setProdName] = useState("loading ...");
    const [prodDesc, setProdDesc] = useState("loading ...");
    const [price, setPrice] = useState("loading ...");
    const [prodImgs, setProdImg] = useState("loading ...");
    const [cats, setCats] = useState(null);
    var canvas = document.getElementById("canvas");
    const width = 414;
    const height = width / (4 / 3);
    const [products, setProducts] = useState(null);
    let navigate = useNavigate()


    const getProd = async () => {
        try {

            const response = await axios.get(`${apiUrl}/getProd/` + id)
            setProducts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!products) {
            getProd()
        }
        if (products) {
            if (prodName === "loading ...") {
                setPrice(products[0].price)
                setProdCat(products[0].prodCat)
                setProdDesc(products[0].prodDesc)
                setPrice(products[0].price)
                setProdImg(products[0].prodImg)
                setProdName(products[0].prodName)
            }
        }

    }, [products])

    const getCats = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getCat`)
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


                <option key = {key} value={catName}>

                    {catName}

                </option>


            )
            return (
                <select className="form-select my-4" aria-label="Default select example" id="catColor" onChange={(e) => setProdCat(e.target.value)}>
                    <option value={prodCat}> {prodCat} </option>
                    {categories}
                </select>
            )
        } else {
            return (<p className="text-center"> Loading....</p>)
        }
    }

    function displayImg(data) {
        return <img className="mw-25" width={1000} height={200} alt="test" src={`data:image/png;base64,${data}`} />
    }

    const handleFileRead = async (e) => {

        var img = new Image;
        img.onload = function () {
            var iwidth = img.width;
            var iheight = img.height;
            var scale = Math.min((200 / iwidth), (200 / iheight))
            var iwScaled = iwidth * scale;
            var ihScaled = iheight * scale;
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            canvas.getContext('2d').drawImage(img, 0, 0, iwScaled, ihScaled)

        }

        img.src = URL.createObjectURL(e.target.files[0]);
    }

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play()
        }).catch(err => {
            console.log(err);
        })
    }

    const takePhoto = (e) => {
        e.preventDefault()
        const width = 200;
        const height = width / (4 / 3);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');

        ctx.drawImage(video, 0, 0, width, height);

    }
    useEffect(() => {
        getVideo()
    }, [videoRef])


    const displayCam = (e) => {
        e.preventDefault()
        document.getElementById('camera-div').classList.remove('d-none')
        document.getElementById('close-button').classList.remove('d-none')
    }

    const close = (e) => {
        e.preventDefault()
        document.getElementById('camera-div').classList.add('d-none')
        document.getElementById('close-button').classList.add('d-none')
    }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if(!(!new Uint32Array(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.buffer).some(x => x !== 0))){
            var prodImg = canvas.toDataURL("image/jpeg", 0.5).split(',')[1]
            await axios.put(`${apiUrl}/updateProdImg/`+id, { prodName, prodDesc, price,prodImg, prodCat })
        }else{
            var prodImg = prodImgs;
            await axios.put(`${apiUrl}/updateProdNoImg/`+id, { prodName, prodDesc, price, prodCat })
        }

    
        return navigate("/backend/edit-prod")
    } catch (err) {
      console.log(err)
    }



  }

  const handleDelete = async(e) =>{
    e.preventDefault()

    try{

        await axios.delete(`${apiUrl}/deleteProd/` + id)
        return navigate("/backend/edit-prod")

    }catch(err){
        console.log(err)
    }
}
    

    return (

        <>

            <div className="d-flex align-items-center flex-direction-column w-100 z-1">

                <h1 className="mb-3 text-center"> Edit Product Page</h1>
                <h3 className="mb-3 text-center"> Use this page to edit a product</h3>

                <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                    {displayCats(cats)}
                    <label for="pordName" className="form-label">
                        Product Name
                    </label>
                    <input
                        className="form-control"
                        name="pordName"
                        id="pordName"
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                    />
                    <label for="prodDesc" className="form-label">
                        Prodcut Description
                    </label>
                    <textarea
                        className="form-control"
                        name="prodDesc"
                        id="prodDesc"
                        type="text"
                        rows="3"
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                    />

                    <label for="prodPrice" className="form-label">
                        Product Price
                    </label>

                    <input
                        className="form-control"
                        name="prodPrice"
                        id="prodPrice"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                        className="form-control mt-3"
                        id="originalFileName"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        label="Document"
                        name="originalFileName"
                        onChange={(e) => handleFileRead(e)}
                        size="small"
                        variant="standard"
                    />

                    <button className="btn border mt-3 w-100" onClick={(e) => displayCam(e)}> Take image</button>
        
                    <div className="d-flex d-none justify-content-center mt-3" id="camera-div">
                        <div className="d-flex flex-direction-column justify-content-center align-items-center w-75  z-3 mt-3" >
                            <video style={{ width: width, height: height }} ref={videoRef}></video>
                            <button className="btn mt-3 border border-dark" onClick={(e) => takePhoto(e)} > TAKE PICTURE</button>
                        </div>


                    </div>
                    <button className="btn border border-dark d-none w-100 mt-3" id="close-button" onClick={(e) => close(e)}> Close</button>

                    <input type="submit" className="form-control mt-4" />
                    <button className="btn border border-dark w-100 mt-4 mx-auto" onClick={handleDelete}> DELETE </button>



                </form>
                <p className="text-center pt-3">If no new image is selected the image will not change</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-direction-column">
                        <br></br>
                        <p className="ps-5"> Your Old Image: </p>
                        {displayImg(prodImgs)}
                    </div>
                    <div className="d-flex flex-direction-column text-center">
                        <br />Your New Image:<br />
                        <canvas id="canvas" width="200" height="200" ref={photoRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editprodsingle;