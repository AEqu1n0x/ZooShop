import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { fetchAllItems, deleteItem } from "../../http/itemAPI";

const DeleteItem = ({ show, onHide }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await fetchAllItems();
      setItems(data.rows.sort((a, b) => a.id - b.id)); // Сортировка по id от меньшего к большему
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить товар</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(items) ? (
          items.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
              <div>{item.id} - {item.name}</div> {/* Вывод id товара */}
              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Удалить
              </Button>
            </div>
          ))
        ) : (
          <div>Загрузка...</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItem;