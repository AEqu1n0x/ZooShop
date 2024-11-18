import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Delivery = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Доставка</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Быстрая доставка</Card.Title>
              <Card.Text>
                Мы гарантируем доставку вашего заказа в течение недели. Наша служба доставки работает быстро и эффективно, чтобы вы могли получить свои товары как можно скорее.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Безопасная упаковка</Card.Title>
              <Card.Text>
                Все товары тщательно упаковываются, чтобы обеспечить их сохранность во время транспортировки. Мы используем качественные материалы для упаковки, чтобы ваши товары прибыли к вам в целости и сохранности.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Отслеживание заказа</Card.Title>
              <Card.Text>
                После отправки заказа Ваш профиль обновится, где будут показаны заказы и сроки их получения. Мы держим вас в курсе на каждом этапе доставки, чтобы вы всегда знали, где находится ваш заказ.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Удобные способы доставки</Card.Title>
              <Card.Text>
                Мы предлагаем различные способы доставки, чтобы вы могли выбрать наиболее удобный для вас вариант. Доставка осуществляется курьером до двери или до ближайшего пункта выдачи заказов.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Delivery;