import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { addOrder } from "../../http/itemAPI";

const CreateOrder = ({ show, onHide, bascket }) => {
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");

  const handleSubmit = async () => {
    const items = bascket.map((item) => ({
      itemId: item.item.id,
      count: item.count || 1,
    }));
    const orderData = {
      postcode,
      country,
      city,
      street,
      apartment,
      items,
    };

    try {
      await addOrder(orderData);
      onHide();
      alert("Заказ успешно оформлен");
      // Дополнительные действия после оформления заказа
    } catch (error) {
      alert("Ошибка при оформлении заказа");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Создать заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-2"
            placeholder="Почтовый индекс"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <Form.Control className="mt-2" placeholder="Страна" value={country} onChange={(e) => setCountry(e.target.value)} />
          <Form.Control className="mt-2" placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} />
          <Form.Control className="mt-2" placeholder="Улица" value={street} onChange={(e) => setStreet(e.target.value)} />
          <Form.Control
            className="mt-2"
            placeholder="Квартира"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <div className="ml-5">
        <h5 className="ml-2">Проверьте Ваш заказ!</h5>
        {bascket.map((item) => (
          <div key={item.id} className="ml-2">
            <p>
              {item.item.name} - {item.count} шт.
            </p>
          </div>
        ))}
        <p className="ml-2">
          Итоговая стоимость: {bascket.reduce((total, item) => total + item.item.price * item.count, 0)} руб.
        </p>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Оформить заказ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrder;
