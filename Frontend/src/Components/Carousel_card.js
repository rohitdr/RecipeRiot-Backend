import React from 'react'

export default function Carousel_card(props) {
  
  return (
 
    <>
        <img src={props.image} className="card-img-top carousel_card_image" alt="..." style={{height:`${props.height}%`}}  />
        <div className="card-img-overlay carousel_card_title">
    <h5 className="card-title text-dark fw-bold" id='ti'  >{props.title}</h5>
    
  </div>
 
    </>
   
  )
}
