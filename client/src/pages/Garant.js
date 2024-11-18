import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Garant = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Гарантия</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Гарантия на корма</Card.Title>
              <Card.Text>
                На все корма для животных мы предоставляем гарантию сроком на 1 месяц с момента покупки. Если вы обнаружите проблемы с качеством корма в течение этого периода, мы заменим товар или вернем деньги.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Гарантия на аксессуары</Card.Title>
              <Card.Text>
                На аксессуары для животных, такие как игрушки, лежаки и переноски, мы предоставляем гарантию сроком на 6 месяцев. Если в течение этого периода вы обнаружите дефекты или проблемы с качеством, мы заменим товар или вернем деньги.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Возврат товара</Card.Title>
              <Card.Text>
                Если вы по какой-либо причине не удовлетворены покупкой, вы можете вернуть товар в течение 14 дней с момента получения. Мы гарантируем возврат денежных средств после получения и проверки товара.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Поддержка клиентов</Card.Title>
              <Card.Text>
                Наша служба поддержки клиентов всегда готова помочь вам с любыми вопросами или проблемами, связанными с гарантией или возвратом товара. Мы стремимся обеспечить высокий уровень обслуживания и удовлетворенности клиентов.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Garant;