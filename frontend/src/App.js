import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [wordSearch, setWordSearch] = useState("");
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${wordSearch}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: wordSearch }, ...images]);
      })
      .catch((error) => {
        console.log(error);
      });

    setWordSearch("");
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search
        word={wordSearch}
        setWord={setWordSearch}
        handleSubmit={handleSearchSubmit}
      />
      <Container className="mt-4">
        {!images.length ? (
          <Welcome />
        ) : (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, index) => (
              <Col key={index} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default App;
