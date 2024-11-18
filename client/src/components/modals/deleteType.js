import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { fetchTypes, deleteType } from "../../http/itemAPI";

const DeleteType = ({ show, onHide }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => setTypes(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteType(id);
    setTypes(types.filter(type => type.id !== id));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить тип товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {types.map(type => (
          <div key={type.id} className="d-flex justify-content-between align-items-center mb-2">
            <div>{type.name}</div>
            <Button variant="danger" size="sm" onClick={() => handleDelete(type.id)}>
              Удалить
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteType;