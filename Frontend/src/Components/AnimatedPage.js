import React from "react";
import { motion } from "framer-motion";
import 'animate.css'
const AnimatedPage = ({ children }) => {
  const animation={
      initial:{opacity:0, y:-100},
      animate:{ opacity:1,y:0},
      exit:{opacity:0,y:100}
  }
  

  // const animation = {
  //   initial: { opacity: 0.5, y:'-100vh',scale:0.3 },
  //   animate:  { opacity: 1, y:0,scale:1},
  //   exit:{ opacity: 0.5, y:"100vh",scale:0.3}
  // };
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
