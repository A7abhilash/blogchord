import React from "react";
import { motion } from "framer-motion";
const BACKEND_URL = "http://localhost:7781";

function GuestSection() {
  return (
    <motion.div
      variants={guestVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="col-md-4 text-center card bg-secondary p-0 mx-auto mt-5"
    >
      <div className="card-header">
        <h4>Blogchord</h4>
      </div>
      <div className="card-content p-2">
        <h5>Welcome user!</h5>
        <a
          role="button"
          href={`${BACKEND_URL}/auth/google`}
          className="btn btn-sm btn-primary"
        >
          Sign in
        </a>
      </div>
    </motion.div>
  );
}

export default GuestSection;

const guestVariant = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.1, duration: 0.7 },
  },
  exit: {
    scale: 0,
    transition: { delay: 0.1, duration: 1, ease: "easeInOut" },
  },
};
