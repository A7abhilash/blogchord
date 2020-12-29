import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

function Alert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <div style={alertBoxStyle}>
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-md-4 mx-2 mx-md-auto bg-light rounded px-0 text-dark d-block"
          >
            <h4 className="p-2">Welcome</h4>
            <motion.div variants={borderVariant}></motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default Alert;

const alertVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: { delay: 0.2, duration: 0.8, type: "spring", stiffness: 90 },
  },
  exit: {
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const borderVariant = {
  hidden: {
    width: "0%",
    height: 3,
  },
  visible: {
    backgroundColor: "#dc3545",
    height: 3,
    width: "100%",
    transition: { duration: 4 },
  },
};

const alertBoxStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "10%",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
