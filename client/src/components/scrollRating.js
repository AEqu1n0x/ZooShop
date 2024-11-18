import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useParams } from "react-router-dom";
import { fetchRate } from "../http/itemAPI";
import { Container, Row, Col, Card } from "react-bootstrap";

const ScrollRating = () => {
  const { item } = useContext(Context);
  const { id } = useParams();
  const itemId = String(id);

  const [reviews, setReviews] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRate(itemId)
      .then((data) => setReviews(data))
      .catch((error) => {
        console.error('Ошибка при получении отзывов:', error);
        setError(error.message);
      });
  }, [itemId]);

  return (
    <Container>
      <h4 className="mt-4">Отзывы</h4>
      <Row>
        {reviews.map((review) => (
          <Col key={review.id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Отзыв оставил пользователь №{review.userId}</Card.Title>
                <Card.Text>
                  <p>
                    <strong>Преимущества:</strong> {review.advantage}
                  </p>
                  <p>
                    <strong>Недостатки:</strong> {review.disadvantage}
                  </p>
                  <p> <strong>Комментарий: </strong>{review.comment}</p>
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Оценка: {review.rate}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ScrollRating;
