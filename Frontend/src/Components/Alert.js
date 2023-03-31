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
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1.5 }}
        >
          <div
            className={`alert alert-${props.alert.type} sticky-top  alert-dismissible  d-flex align-items-center`}
            role="alert"
            style={{ top: "65px" }}
          >
            <div>
              <strong>{props.alert.message}</strong>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
