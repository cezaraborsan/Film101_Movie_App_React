import React from "react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <PacmanLoader color="#c790d8" size={25} />
      </div>
    </div>
  );
};

export default Loader;
