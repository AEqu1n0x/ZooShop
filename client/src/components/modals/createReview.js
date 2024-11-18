import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createRate } from "../../http/itemAPI";
import { useParams } from "react-router-dom";

const CreateRate = ({ show, onHide }) => {
  const [advantage, setAdvantage] = useState();
  const [disadvantage, setDisadvantage] = useState();
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();
  const { id } = useParams();

  const addRate = () => {
    const formData = new FormData();
    formData.append("advantage", advantage);
    formData.append("disadvantage", disadvantage);
    formData.append("comment", comment);
    formData.append("rate", rate);
    formData.append("itemId", id);

    createRate(formData).then((data) => {
      setAdvantage("");
      setDisadvantage("");
      setComment("");
      setRate("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить отзыв</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            value={advantage}
            onChange={(e) => setAdvantage(e.target.value)}
            placeholder="Введите приемущества"
          />
          <Form.Control
            className="mt-3"
            value={disadvantage}
            onChange={(e) => setDisadvantage(e.target.value)}
            placeholder="Введите минусы"
          />
          <Form.Control
            className="mt-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Общее впечатление"
          />
          <Form.Control
            className="mt-3"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            type="number"
            min="1"
            max="5"
            placeholder="Поставьте оценку от 1 до 5"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="success" onClick={addRate}>
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRate;
