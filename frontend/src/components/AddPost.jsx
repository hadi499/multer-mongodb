import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const loadImage = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    setFile(image);
  };

  const saveArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    const formData2 = new FormData();
    formData.append("image", file);

    const upload = await axios.post("/api/upload", formData2, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    try {
      await axios.post("/api/articles", formData, upload, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={5}>
          <Form onSubmit={saveArticle}>
            <h2 className="text-center my-3">Add Post</h2>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body:</Form.Label>
              <Form.Control
                type="name"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>
              <Form.Control type="file" onChange={loadImage} />
            </Form.Group>

            <Button type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
