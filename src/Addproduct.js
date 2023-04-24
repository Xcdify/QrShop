
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Addproduct() {
  const [prodCat, setProdCat] = useState(null);
  const [prodName, setProdName] = useState(null);
  const [prodDesc, setProdDesc] = useState(null);
  const [price, setPrice] = useState(null);
  const [cats, setCats] = useState(null);
  var canvas = document.getElementById("canvas");
  const width = 414;
  const height = width / (16 / 9);


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

  const postPorduct = async (e) => {

    try {

      if (prodCat === null || prodCat === 'Category') {
        alert('Please choose a category')
      } else {
        var prodImg = canvas.toDataURL("image/jpeg", 0.5).split(',')[1]
        await axios.post('http://localhost:8000/postProd', { prodName, prodDesc, price, prodImg, prodCat })
      }



    } catch (err) {
      console.log(err)
    }



  }


  function displayCats(cats) {
    if (cats) {
      const categories = cats.map(({ id, catName, catDesc, color, products }, key) =>


        <option key={key} value={catName}>

          {catName}

        </option>


      )
      return (
        <select className="form-select my-4" aria-label="Default select example" id="catColor" onChange={(e) => setProdCat(e.target.value)}>
          <option value="0"> Category </option>
          {categories}
        </select>
      )
    } else {
      return (<p className="text-center"> Loading....</p>)
    }
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
  return (
    <>

      <div className="d-flex align-items-center flex-direction-column w-100 z-1">

        <h1 className="mb-3 text-center"> Add Product Page</h1>
        <h3 className="mb-3 text-center"> Use this page to add a products to your categories</h3>

        <form className="w-50 mx-auto" onSubmit={postPorduct}>
          {displayCats(cats)}
          <label for="pordName" className="form-label">
            Product Name
          </label>
          <input
            className="form-control"
            name="pordName"
            id="pordName"
            type="text"
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



        </form>

        <br />Your Uploaded Image:<br />
        <canvas id="canvas" width="200" height="200" ref={photoRef}></canvas>

    
      </div>
    </>
  );
}

export default Addproduct;
