import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAlert } from "../../contexts/AlertContext";

function Alert() {
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    // console.log(alert);
    let mounted = true;
    if (mounted && alert) {
      setTimeout(() => {
        setAlert("");
      }, 4000);
    }
    return () => {
      mounted = false;
    };
  }, [alert]);

  return (
    <AnimatePresence exitBeforeEnter>
      {alert && (
        <div style={alertBoxStyle}>
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-md-4 mx-2 mx-md-auto bg-light rounded px-0 text-dark d-block"
          >
            <h6 className="pt-2 pb-1 text-center">{alert}</h6>
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
    // y: "-100vh",
    scale: 0,
  },
  visible: {
    // y: 0,
    scale: 1,
    transition: { delay: 0.2, duration: 0.8, type: "spring", stiffness: 90 },
  },
  exit: {
    // y: "-100vh",
    scale: 0,
    transition: { ease: "easeInOut", duration: 0.8 },
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
  height: "100%",
  backgroundColor: "#1f1f1f23",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
