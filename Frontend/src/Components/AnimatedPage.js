import React from "react";
import { motion } from "framer-motion";
const AnimatedPage = ({ children }) => {
  // const animation={
  //     initial:{opacity:0, x:-100},
  //     animate:{ opacity:1,x:0},
  //     exit:{opacity:0,x:100}
  // }
  const animation = {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  };
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
export default AnimatedPage;
