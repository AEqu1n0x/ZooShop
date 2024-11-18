import React from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";

const OrderModal = ({ order, show, onHide }) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Детали заказа #{order.orderDetails.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Имя:</strong> {order.orderDetails.name}</p>
        <p><strong>Фамилия:</strong> {order.orderDetails.surname}</p>
        <p><strong>Телефон:</strong> {order.orderDetails.phone}</p>
        <p><strong>Email:</strong> {order.orderDetails.email}</p>
        <p><strong>Индекс:</strong> {order.orderDetails.postcode}</p>
        <p><strong>Страна:</strong> {order.orderDetails.country}</p>
        <p><strong>Город:</strong> {order.orderDetails.city}</p>
        <p><strong>Улица:</strong> {order.orderDetails.street}</p>
        <p><strong>Квартира:</strong> {order.orderDetails.apartment}</p>
        <p><strong>Дата заказа:</strong> {new Date(order.orderDetails.dateOrder).toLocaleString()}</p>
        <p><strong>Дата доставки:</strong> {formatDate(order.orderDetails.dateDelivery)}</p>
        
        <h5 className="mt-4">Заказанные товары:</h5>
        {order.orderedItems.map((item) => (
          <Row key={item.id} className="mb-3">
            <Col xs={3}>
              <Image src={process.env.REACT_APP_API_URL + item.item.imgMain} alt={item.item.name} fluid />
            </Col>
            <Col xs={9}>
              <p><strong>{item.item.name}</strong></p>
              <p>Количество: {item.count} шт.</p>
              <p>Стомость за шт.: {item.price} руб.</p>
              <p>Стоимость: {item.count * item.price} руб.</p>
            </Col>
          </Row>
        ))}
        <h5 className="mt-4">Итоговая стоимость: {order.orderDetails.totalPrice} руб.</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;