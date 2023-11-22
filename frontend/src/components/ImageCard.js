import React from "react";
import { Card, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const ImageCard = ({ image, deleteImage, saveImage }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image.urls?.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{" "}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        <Card.Text>Author: {image.user?.name ?? "No author name"}</Card.Text>
        <Nav.Link
          hidden={!image.user.portfolio_url}
          href={image.user.portfolio_url}
          target="_blank"
        >
          Portfolio
        </Nav.Link>
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
