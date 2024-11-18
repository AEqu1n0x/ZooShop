import React, { useState, useEffect } from "react";
import {Button, Modal } from "react-bootstrap";
import { fetchPet, deletePet } from "../../http/itemAPI";

const DeletePet = ({ show, onHide }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPet().then(data => setPets(data));
  }, []);

  const handleDelete = async (id) => {
    await deletePet(id);
    setPets(pets.filter(pet => pet.id !== id));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить тип питомца</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pets.map(pet => (
          <div key={pet.id} className="d-flex justify-content-between align-items-center mb-2">
            <div>{pet.name}</div>
            <Button variant="danger" size="sm" onClick={() => handleDelete(pet.id)}>
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

export default DeletePet;