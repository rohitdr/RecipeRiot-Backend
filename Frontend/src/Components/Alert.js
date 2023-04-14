import React from "react";
import { motion } from "framer-motion";
export default function Alert(props) {
  const animation = {
    initial: { opacity: 0, y: -80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -80 },
  };
  return (
    <>
      {props.alert && (
        
          <div
            className={`alert alert-${props.alert.type} sticky-top  w-100  alert-dismissible  d-flex align-items-center`}
            role="alert"
          
          >
            <div>
              <strong>{props.alert.message}</strong>
            </div>
          </div>
    
      )}
    </>
  );
}
