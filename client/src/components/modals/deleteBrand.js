import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { fetchBrand, deleteBrand } from "../../http/itemAPI";

const DeleteBrand = ({ show, onHide }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrand().then(data => setBrands(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteBrand(id);
    setBrands(brands.filter(brand => brand.id !== id));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить бренд товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {brands.map(brand => (
          <div key={brand.id} className="d-flex justify-content-between align-items-center mb-2">
            <div>{brand.name}</div>
            <Button variant="danger" size="sm" onClick={() => handleDelete(brand.id)}>
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

export default DeleteBrand;