import React from 'react'
import { motion } from 'framer-motion'
export default function Alert(props) {
    // const capital =(message)=>{
    //     let lower =message.toLowerCase();
    //     return ((lower.charAt(0).toUpperCase()) + lower.slice(1))
    // }
  return (
     <>
    {/* { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capital(props.alert.strongmessage)}</strong> {props.alert.message} </div>
  } */}

{ props.alert && <div class={`alert alert-${props.alert.type} sticky-top  alert-dismissible  d-flex align-items-center`} role="alert" style={{top:"65px"}}>
  
  <div>
  <strong>{props.alert.message}</strong>
  </div>
</div>}
 </>


  )
}
