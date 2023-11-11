import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-4 ">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col xs={9}>
                <Form.Label
                  htmlFor="inlineFormInputName"
                  visuallyHidden
                ></Form.Label>
                <Form.Control
                  type="text"
                  id="inlineFormInputName"
                  value={word}
                  onChange={(event) => setWord(event.target.value)}
                  placeholder="Search for something..."
                />
              </Col>
              <Col xs="auto" className="my-1">
                <Button variant="outline-primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
