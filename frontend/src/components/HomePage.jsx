import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await axios.get("/api/articles");
    setPosts(response.data);
  };
  return (
    <Container>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mt-5 p-2 m-0">
              <Card.Img variant="top" src={post.image} height={200} />
              <Card.Body>
                <Card.Title className="text-center">{post.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default HomePage;
