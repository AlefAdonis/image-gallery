import React from "react";
import { Button } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="mt-4 rm-4 p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">
          Welcome to Clio, The <i>Best</i> Image Gallery of All Universe!
        </h1>
        <p className="col-md-8 fs-4">
          This amazing app allows you, mere mortal, to obtain the most value
          pictures from the Unsplash, simply searching for a term!
        </p>
        <Button variant="primary" href="https://unsplash.com" target="blank">
          Go to the Unsplash Website
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
