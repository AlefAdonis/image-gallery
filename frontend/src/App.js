import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome";
import Loading from "./components/Spinner";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";

const App = () => {
  const [wordSearch, setWordSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${wordSearch}`);
      setImages([{ ...res.data, title: wordSearch }, ...images]);
    } catch (error) {
      console.log(error);
    }

    setWordSearch("");
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);

      if (res.data?.delete_id === id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);

      if (res?.data.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Loading />
      ) : (
        <>
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
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default App;
