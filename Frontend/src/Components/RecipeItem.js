import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import './RecipeItem.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import RecipeContext from "../Context/RecipeContext";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RecipeItem(props) {
  let Navigate = useNavigate();
//to captalize first character

const firstCapital =(message)=>{
  let lower =message.toLowerCase();
  return ((lower.charAt(0).toUpperCase()) + lower.slice(1))
}

useEffect(()=>{
getUserbyid(props.user)
getUser();
},[])

const [heart,setHeart]=useState("regular")
  const context = useContext(RecipeContext)
  const {deleteRecipe, RecipeBYId,LikeRecipe,UnLikeRecipe,setCurrentRecipeItemid,getUserbyid,userbyid,getUser,userData} = context
 
const [star,setstar]=useState(0)
  let location = useLocation();

 
  
 



const settingheart=()=>{
  if(userData?.user?.Liked_Recipe?.includes(props.id)){
 
setHeart("solid")

}
else{
  setHeart("regular")
  
}}
  React.useEffect(() => {
   
  }, [location])

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Share</Popover.Header>
      <Popover.Body>
        <div className="d-flex me-4 justify-content-between">
      <i className="fa-brands fa-whatsapp me-4 fs-2 fw-bold text-success"></i>
      <i className="fa-brands fa-instagram me-4  fs-2 fw-bold text-danger"></i>
      <i className="fa-brands fa-facebook me-4  fs-2 fw-bold text-primary"></i>
      <i className="fa-brands fa-snapchat fs-2 me-4  fw-bold text-warning  "></i>
   </div>
      </Popover.Body>
    </Popover>
  );

 
   var deg =180;
const onclickRotate=()=>{
 

document.getElementById(`${props.id}`).style.transform=`rotateY(${deg}deg)`;

deg=(deg===180)?0:180
}
  return (
    <>
    
    <motion.div initial={{opacity:0 ,scale:0}} whileInView={{opacity:1,scale:1}} viewport={{ once: true }} transition={{duration:1,delay:props.delay}} >
<div className="scene " onLoad={settingheart}>
  <div className="recipecard  card border-success " id={`${props.id}`} style={{Width: "18rem"}}>
  
    <div className="face front">
    
  <img src={props.ImageUrl} className="card-img-top recipeitemimageopacity box_decrease_size_animation" alt="..."/>
  <div className="card-body">
    <div className="d-flex justify-content-between">
    <h6 className="card-title text-warning text-start recipeitemtext"> {props.source}</h6>
    <h6 className="card-title text-primary text-start"><div onClick={()=>{  
      
    
       Navigate(`${(!sessionStorage.getItem("auth-token") && !localStorage.getItem("auth-token"))?"/login":"/Individual_description"}`,{state:{RecipeItemid:props.id}});
       
           }}
         ><i className="fa-solid fs-4 fa-diamond-turn-right"></i></div></h6>
    </div>
  <h4 className="card-subtitle mb-2 text-dark fw-bold recipeitemtext ">{props.title}</h4>
    <p className="card-text text-dark recipeitemtext"> {props.Ingridiants}</p>
   
    <div className="card-text text-dark d-flex justify-content-between">
      <p>
       <i className={`fa-${props.rating>0?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(1)}}></i>
       <i className={`fa-${props.rating>1?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(2)}}></i>
       <i className={`fa-${props.rating>2?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(3)}}></i>
       <i className={`fa-${props.rating>3?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(4)}}></i>
       <i className={`fa-${props.rating>4?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(5)}}></i></p>
       <i className="fa-solid fa-right-left" onClick={onclickRotate}></i></div>
  </div>
  <ul className="list-group list-group-flush ">
    <li className="list-group-item d-flex justify-content-between">
      <i className="fa-solid fs-5 fa-comment"></i>
      <i className={`fa-${heart} fa-heart fs-5 recipeitemlike text-danger`} onClick={()=>{ 
      if(!sessionStorage.getItem("auth-token")&& !localStorage.getItem("auth-token")){
        Navigate("/login")
                }else{
                  if(heart==="regular"){
                    LikeRecipe(props.id)
                    setHeart("solid")
                  }
                  if(heart=="solid"){
                    UnLikeRecipe(props.id)
                    setHeart("regular")
                  }
                }
              
               }
       }
       ></i>
       <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <i className="fa-solid fs-5 fa-share-nodes"></i>
  </OverlayTrigger>
      </li>
    
   
  </ul>
  <div className="card-img-overlay">
    <div className="row">
      <div className="col-md-2">
      <p className="badge recipeitembadgeopacity text-success fw-bold  fs-5 m-1">{props.health_labels[1]}</p>
      </div>
  
    </div>
    <div className="row">
      <div className="col-md-2">
      <p className="badge recipeitembadgeopacity text-success fs-5 m-1">{props.health_labels[2]}</p>
      </div>
  
    </div>
     <div className="row">
      <div className="col-md-2">
      <p className="badge recipeitembadgeopacity text-success  fs-5 m-1">{props.health_labels[3]}</p>
      </div>
  
    </div>
   
  </div>

  <div className="card-footer recipeitemtext">
  <i className="fa-regular me-2 fa-clock"></i>{(new Date(props.date).toLocaleString().substring(0,19))}
  </div>
</div>

  <div className="back ">

 

<div className="card testimonial-card pt-4 ">
        <div className="card-up" ></div>
        <div className="avatar mx-auto bg-white">
          <img src={userbyid?.user?.Profile_Image}
            className="rounded-circle img-fluid" style={{height:"250px"}} />
        </div>
        <div className="card-body text-center pt-2">
          <h3 className="mb-2 fw-bold card-title">{userbyid?.user?.name}</h3>
   <hr/>
          <ul className="list-group list-group-flush">
  
    <div className="card-text text-dark mb- d-flex justify-content-between">
    <p>
      
    <i className={`fa-${star>0?"solid":"regular"} text-danger recipeitemstar fa-star`} onClick={()=>{setstar(1)}}></i>
       <i className={`fa-${star>1?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(2)}}></i>
       <i className={`fa-${star>2?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(3)}}></i>
       <i className={`fa-${star>3?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(4)}}></i>
       <i className={`fa-${star>4?"solid":"regular"} text-danger fa-star`} onClick={()=>{setstar(5)}}></i></p>
       <i className="fa-solid fa-right-left " onClick={onclickRotate}></i></div>
       
       <div className="card-text text-dark d-flex justify-content-evenly">
       <h6 className="text-dark">{userbyid?.user?.Liked_Recipe?.length}</h6><h6 className="text-dark">{userbyid?.totalResults}</h6><p className="text-dark">{userbyid?.TotalCommnts}</p>
      </div>
      <p className="card-text text-dark d-flex justify-content-evenly">
      <i className="fa-heart fa-solid fs-4 text-danger"></i>
      <i className="fa-solid fa-utensils fs-4 "></i>
      <i className="fa-solid fs-4 fa-comment"></i>
      </p>
       <p className="card-text text-dark d-flex justify-content-around">
       <i className="fa-brands fa-whatsapp  fs-2 fw-bold text-success" ></i>
      <i className="fa-brands fa-instagram   fs-2 fw-bold text-danger"></i>
      <i className="fa-brands fa-facebook   fs-2 fw-bold text-primary"></i>
        </p>
 
 
   
  </ul>
        </div>
      </div>
 


    </div>       
        
        
        
        
  
   
       

  </div>
</div>

</motion.div>







    </>
  );
}
