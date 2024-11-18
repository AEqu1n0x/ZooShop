import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createType } from "../../http/itemAPI";

const CreateType = ({ show, onHide }) => {
  const [name, setName] = useState();
  const [image, setImage] = useState();

  const addType = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", image);
  
    createType(formData).then((data) => {
      setName("");
      setImage(null);
      onHide();
    });
  };
   
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Изменить тип товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Название типа" />
          <Form.Control onChange={(e) => setImage(e.target.files[0])} className="mt-3" placeholder="Картинка" type="file" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="warning" onClick={addType}>
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
