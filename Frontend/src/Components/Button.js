import React from 'react'
import { CDBBtn } from "cdbreact";
export default function Button(props) {
  return (
    <CDBBtn  color={props.type} href={props.href} size={props.size} onClick={props.onClick} disabled={props.disabled} circle style={{color:props.textcolor}}>
   {props.label}
  </CDBBtn>
  )
}
