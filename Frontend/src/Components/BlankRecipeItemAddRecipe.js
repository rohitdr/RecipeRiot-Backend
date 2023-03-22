import React from 'react'
import { Button } from '@nextui-org/react'
export default function BlankRecipeItemAddRecipe() {
  return (
   <>
   <div className="col-md-3">
   <div className="scene " style={{backgroundColor:"transparent"}}>
  <div className="recipecard  card border-success " style={{Width: "18rem"}}>
  
    <div className="face front">
{/*     
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
  </div> */}

<div className="d-flex justify-content-center position-relative top-50 fw-bold fs-2 "  ><Button auto ghost color="gradient" >Add Recipe</Button></div>

 
</div>

     
   
        
        
        
  
   
       

  </div>
</div></div>
   </>
  )
}
