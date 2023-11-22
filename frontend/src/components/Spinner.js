import React from "react";
import Spinner from "react-bootstrap/Spinner";

const spinnerStyle = {
  position: "absolute",
  top: "calc(50% - 1rem)",
  left: "calc(50% - 1rem)",
};

const Loading = () => {
  return (
    <div>
      <Spinner
        style={spinnerStyle}
        animation="border"
        role="status"
        variant="primary"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
