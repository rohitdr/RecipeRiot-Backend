import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import RecipeContext from '../Context/RecipeContext'
import { useNavigate } from "react-router-dom";
import { Input,Button } from '@nextui-org/react';
import InternalServerError from './InternalServerError';
import AnimatedPage from './AnimatedPage';

export default function Profile_Profile() {
  const [showfile, setshowfile]= useState(null)
  const [user,setuser]=useState({username:"",first_name:"",last_name:"",email:"",phone_number:""})
  const [socaildetails,setsocialdetails]=useState({git:"",facebook:"",twitter:"",web:""})
  const [filesize , setfilesize]= useState(0)
  const context = useContext(RecipeContext)
  const {getUser,userData,showAlert,setProgress,setAlert} = context
  const [servererror, setservererror]=useState(0)
    let Navigate = useNavigate();
  useEffect(()=>{
    if(!sessionStorage.getItem("auth-token")&& !localStorage.getItem("auth-token")){
Navigate("/login")
    }
    else{
getUser()
    }
  },[userData])
  //converting image to base64
  const toBase64=(file)=>
    new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=(error)=>reject(error);
    });
  

  //image preview
const imagepreview=async (e)=>{
const imagefile = e.target.files[0];
setfilesize(e.target.files[0].size)
const imageurl = URL.createObjectURL(imagefile)
const previewing = document.querySelector("#profile_avtar")
previewing.src=imageurl

 let base64= await toBase64(imagefile)

 setshowfile(base64)

}
//api for changing the image
const changeprofileimage=async(file)=>{
  try{
setProgress(30)
  
  const response = await fetch("http://localhost:5000/api/auth/changeuploadimage", {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token':sessionStorage.getItem("auth-token")
        'auth-token':sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):localStorage.getItem("auth-token")

       
      },
      body: JSON.stringify({
        "image":file
       })
     
  
    });
  setProgress(50)
    
  let result = await response.json()
  setProgress(70)
if(result){
  showAlert("Image has been changed","success")
}
  
setProgress(100)
  }
  catch(error){
    setProgress(100)
    setservererror(500)
    console.log(error.message)
  }
}

//uploading or changing the file
const changefile=()=>{
 if(filesize>100000){
  showAlert("File size should be less that 100kb","danger")
 }
 else{
changeprofileimage(showfile)
 }



}
//form submit
const submit=(e)=>{
  e.preventDefault();

}

//visible submit button
const visibleSubmit=()=>{
  if(document.getElementById('accountdetailsubmit').style.display=="block"){
    document.getElementById('accountdetailsubmit').style.display="none"
    document.getElementById('accountdetaildisplay').style.display="block"
  }
  else{
    document.getElementById('accountdetailsubmit').style.display="block"
    document.getElementById('accountdetaildisplay').style.display="none"
  }
  
}
//visible image controls
const visibleimagecontrols=()=>{
  if(document.getElementById('imagechangecontrols').style.display=="block"){
    document.getElementById('imagechangecontrols').style.display="none"
   
  }
  else{
    document.getElementById('imagechangecontrols').style.display="block"
  
  }
}
//visible socail network detail form
const visiblesocailSubmit=()=>{
  if(document.getElementById('display-content').style.display=="block"){
    document.getElementById('display-content').style.display="none"
    document.getElementById('displaysocailform').style.display="block"
  }
  else{
    document.getElementById('display-content').style.display="block"
    document.getElementById('displaysocailform').style.display="none"
  }
}
//user detail onchange handler
const userdetailchange=(e)=>{
setuser({...user,[e.target.name]:e.target.value})
}
//api for updating accound detail
const updateaccountdetail=async (data)=>{
  try{
  setProgress(30)
  const response =  await fetch(
    "http://localhost:5000/api/auth/updateuser",
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        // 'auth-token':sessionStorage.getItem("auth-token")
        'auth-token':sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):localStorage.getItem("auth-token")
      },
      body: JSON.stringify(data),
    }
  );
  setProgress(50)
  let result =  await response.json()
  setProgress(70)
 
  if(response.status==404){
    showAlert(result.error,"danger")
    setProgress(100)
  }
  else if(response.status==500){
    setProgress(100)
    setservererror(500)
  
  }
  else{
    showAlert(result,"success")
    setProgress(100)
  }
}
catch(error){
  setProgress(100)
  setservererror(500)
  console.log(error.message)
}
}
//change account detail submit button
const changeaccountdetail=()=>{
  if(document.getElementById('username').value==userData?.user?.username && document.getElementById('email').value==userData?.user?.email && document.getElementById('first_name').value==userData?.user?.first_name && document.getElementById('last_name').value==userData?.user?.last_name && document.getElementById('phone_number').value==userData?.user?.phone_number){
    showAlert("Before submititng the from please Modify any detail","danger")
  }
  else if(document.getElementById('phone_number').value.length !== 10){
  
    showAlert("Phone Should be of 10 digits", "danger")

  }
  
  // validation for password
  else if(document.getElementById('first_name').value.length<3)
  {
    showAlert("First Name should be of more than 3 digits", "danger")
   
  }
  else if(!document.getElementById('email').value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))
  {
    showAlert("Email should in correct Format", "danger")
   
  }
 

  else if(document.getElementById('username').value.length<8)
  {
  
    showAlert("Username Should be of more than 8 digits", "danger")
  }
  else{
    updateaccountdetail(user)
  }
  

  
 

}

//all the function for changing the socail details
const socailonchang=(e)=>{
setsocialdetails({...socaildetails,[e.target.name]:e.target.value})
}
//socail block submit button
const socailsubmit=()=>{
// console.log(userData?.user?.web==undefined)


   updateaccountdetail(socaildetails)

}


 
  return (
    <><AnimatedPage>
   {servererror==500 ? <InternalServerError></InternalServerError>: <div>
      <section style={{backgroundColor: "#eee"}}>
  <div className="container py-5">
   
    

    <div className="row mt-2">
      <div className="col-lg-4">
        <div className="card mb-4 box_decrease_size_animation">
        <div className="card-header d-flex justify-content-between ">Profile Image <i className="fa-solid fa-pen" onClick={visibleimagecontrols}></i></div>

          <div className="card-body text-center">
            <img  alt="avatar" src={userData?.user?.Profile_Image}
              className="rounded-circle img-fluid" id="profile_avtar" style={{width: "150px"}}/>
            <h5 className="my-3">{userData?.user?.first_name} {userData?.user?.last_name}</h5>
        
           
            <div className="d-flex justify-content-center mb-2">
              {/* <button type="button" className="btn btn-primary">Follow</button> */}
              <form onSubmit={submit} id="imagechangecontrols" style={{display:"none"}}>
              <label for="profileimage" className='profileimagelabel'>
  Select Image
  <input id="profileimage" type="file" accept="image/*" onChange={imagepreview}/>
</label>
              <button type="button" className="btn btn-outline-primary ms-2 mb-1" onClick={changefile}>Change Image</button>
              </form>
            </div>
          </div>
        </div>
        <div className="card mb-4 mb-lg-0  box_decrease_size_animation">
        <div className="card-header d-flex justify-content-between ">Social Network <i className="fa-solid fa-pen" onClick={visiblesocailSubmit}></i></div>

          <div className="card-body p-0">
            <ul className="list-group list-group-flush rounded-3" id="display-content">
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fas fa-globe fa-lg text-warning"></i>
                <p className="mb-0">{userData?.user?.web?userData?.user?.web+".com":"recipe.com"}</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-github fa-lg" style={{color: "#333333"}}></i>
                <p className="mb-0">{userData?.user?.git?userData?.user?.git+".git":"recipe.git"}</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-twitter fa-lg" style={{color: "#55acee"}}></i>
                <p className="mb-0">{userData?.user?.twitter?userData?.user?.twitter+".twitter":"recipe.twitter"}</p>
              </li>
             
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-facebook-f fa-lg" style={{color: "#3b5998"}}></i>
                <p className="mb-0">{userData?.user?.facebook?userData?.user?.facebook+".facebook":"recipe.facebook"}</p>
              </li>
            </ul>
             <form className='ms-4 ps-3' id="displaysocailform" onSubmit={(e)=>{e.preventDefault()}}>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white"
                          bordered
                        key="web"
                        
                          onChange={socailonchang}
                          color="secondary"
                          labelLeft="https://"
                          label="Website Name"
                          name="web"
                          id="web"
                          placeholder="Your Website Name"
                          labelRight=".com"
                          contentRight={
                            <i className="fas fa-globe fa-lg text-warning"></i>
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                        key="git"
                          className="box_decrease_size_animationforlogin bg-white"
                          bordered
                          
                          
                          color="primary"
                          onChange={socailonchang}
                          labelLeft="https://"
                          label="Github Reposatary"
                          labelRight=".git"
                          id="git"
                          name="git"
                          contentRight={
                            <i className=" pe-2 fab fa-github fa-lg"></i>
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white "
                          bordered
                           key="facebook"
                          onChange={socailonchang}
                          color="secondary"
                          labelLeft="https://"
                          label="Facebook"
                          name="facebook"
                          id="facebook"
                          labelRight=".facebook"
                          contentRight={
                            <i
                              className="fab fa-facebook-f fa-lg"
                              style={{ color: "#3b5998" }}
                            ></i>
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white "
                          bordered
                         key="twitter"
                          
                          onChange={socailonchang}
                          contentRightStyling={false}
                          color="primary"
                          name="twitter"
                          id="twitter"
                          labelLeft="https://"
                          label="Twitter"
                          labelRight=".twitter"
                          contentRight={
                            <i
                              className="fab fa-twitter fa-lg"
                              style={{ color: "#55acee" }}
                            ></i>
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-around mt-3 pt-2 mb-4">
                       
                        <Button
                          color="primary"
                          auto
                        onPress={socailsubmit}
                          className="box_decrease_size_animationforlogin fw-bold"
                        >
                         Update
                        </Button>
                      </div>
                    </form>
          </div>
        </div>
      </div>
     
      <div className="col-xl-8 accountdetailcard ">
            {/* <!-- Account details card--> */}
            <div className="card mb-4 box_decrease_size_animation">
                <div className="card-header d-flex justify-content-between ">Account Details <i className="fa-solid fa-pen" onClick={visibleSubmit}></i></div>
                <div className="card-body">
                    <form id="accountdetailsubmit" onSubmit={(e)=>{e.preventDefault()}}>
                       
                        <div className="mb-3 col-7">
                            <label className="small mb-1" for="inputUsername">Username </label>
                            <input className="form-control profileform-control " id="username" name='username' type="text" placeholder="Enter your username" onChange={userdetailchange}  defaultValue={userData?.user?.username}  />
                            <div className="invalid-feedback" id="invalid_username">
        Please choose a username.
      </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                      
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputFirstName">First name</label>
                                <input className="form-control profileform-control" id="first_name" type="text" name="first_name" placeholder="Enter your first name" onChange={userdetailchange}  defaultValue={userData?.user?.first_name}/>
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Last name</label>
                                <input className="form-control profileform-control" id="last_name" type="text" name='last_name' placeholder="Enter your last name" onChange={userdetailchange}  defaultValue={userData?.user?.last_name}/>
                            </div>
                        </div>
                      
                        
                      
                        <div className="mb-3 col-7">
                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                            <input className="form-control profileform-control" id="email" type="email" name='email' placeholder="Enter your email address" onChange={userdetailchange}  defaultValue={userData?.user?.email}/>
                        </div>
                      
                        <div className="row gx-3 mb-3">
                        
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Phone number</label>
                                <input className="form-control profileform-control" id="phone_number" type="phone number" name='phone_number' placeholder="Enter your phone number" onChange={userdetailchange}  defaultValue={userData?.user?.phone_number}/>
                            </div>
                        
                           
                        </div>
                        
                        <button className="btn btn-primary" type="button" onClick={changeaccountdetail} >Save changes</button>
                    </form>
                    {/* displaying accound details
                     */}
                    <ul className="list-group list-group-flush rounded-3" id="accountdetaildisplay" width="50%">
              <li className="list-group-item d-flex justify-content-start align-items-center p-3">
              <i className="fa-solid fa-user me-2"></i>
                <p className="mb-0">{userData?.user?.username}</p>
              </li>
              <li className="list-group-item d-flex justify-content-start align-items-center p-3">
              <i className="fa-solid fa-signature me-2"></i>
                <p className="mb-0">{userData?.user?.first_name} {userData?.user?.last_name}</p>
              </li>
              <li className="list-group-item d-flex justify-content-start align-items-center p-3">
              <i className="fa-solid fa-envelope me-2"></i>
                <p className="mb-0">{userData?.user?.email}</p>
              </li>
              <li className="list-group-item d-flex justify-content-start align-items-center p-3">
               
                <i className="fa-solid fa-phone text-primary me-2"></i>
                <p className="mb-0">{userData?.user?.phone_number}</p>
              </li>
             
            </ul>
                
            </div>
        </div>
    </div>
      
      </div>
    </div>
 
</section>
    </div>}</AnimatedPage>
    </>
  )
}
