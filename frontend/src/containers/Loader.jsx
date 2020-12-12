import React from "react";

function Loader({ height }) {
  const loadingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: `${height}vh`,
    margin: "auto",
  };
  return (
    <div style={loadingStyle}>
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loader;
