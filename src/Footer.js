import {BsInstagram,BsTwitter,BsFacebook} from "react-icons/bs"

function Footer(){

    function displayContent(x){
        const section = document.getElementById("footer-section-"+x);
        const hidden = document.getElementById("hidden-"+x);

        if (section.innerText === "+"){
            section.innerText = "-";
            hidden.classList.remove("d-none")
        }else{
            section.innerText = "+";
            hidden.classList.add("d-none")
        }
    }

    return(
        <div className="mr-48">
        <div className="none block justify-center align-center align-items-center border-1 bg-light mt-5 flex h-60">
            <div className="w-25 text-center pt-3">
                <h3>Organization</h3>
            </div>

            <div className="w-25 text-center pt-3">
                <h3>Contact Details</h3>
               
            </div>

            <div className="d-flex flex-direction-column align-items-center w-25 text-center pt-3">
            <h3>Social Media</h3>
               
            </div>
        </div>
        {/*   768px and under    */}
        <div className="d-flex flex-direction-column d-md-none bg-light mt-5">
            
            <div className="border-bottom border-secondary w-100 my-1" onClick={()=> displayContent(1)}>
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <h6 className="ps-2"> Organization</h6>
                    <h6 className="pe-2" id ="footer-section-1"> + </h6>
                </div>
                    <p className="ps-2 d-none" id="hidden-1"></p>
            </div>
            <div className="border-bottom border-secondary w-100 my-1" onClick={()=> displayContent(2)}>
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <h6 className="ps-2"> </h6>
                    <h6 className="pe-2" id ="footer-section-2"> + </h6>
                </div>
                    <p className="ps-2 d-none" id="hidden-2"></p>
            </div>
            <div className="border-bottom border-secondary w-100 my-1" onClick={()=> displayContent(3)}>
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <h6 className="ps-2"> </h6>
                    <h6 className="pe-2" id ="footer-section-3"> + </h6>
                </div>
                <div className="ps-2 d-none" id="hidden-3">
                    <p>Email: </p>
                    <p>Mobil Nummer: </p>
                </div>
            </div>
            <div className="border-bottom border-secondary w-100 my-1" onClick={()=> displayContent(4)}>
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <h6 className="ps-2"> </h6>
                    <h6 className="pe-2" id ="footer-section-4"> + </h6>
                </div>
                <div className="ps-2 pb-2 d-none" id="hidden-4">
                    <BsInstagram className="mx-2" size={30}/>
                    <BsTwitter className="mx-2" size={30}/>
                    <BsFacebook className="mx-2"  size={30}/>
                </div>
            </div>
        </div>
        
        
        
        </div>
    )
}

export default Footer;