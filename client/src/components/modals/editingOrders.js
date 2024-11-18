import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { fetchAllOrders } from "../../http/itemAPI";

const EditingOrders = ({ show, onHide }) => {

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data.allOrders);
    } catch (error) {
      console.error("Ошибка при получении списка заказов:", error);
    }
  };

  const handleStatusChange = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderDetails.id === orderId) {
          return {
            ...order,
            orders: order.orders.map((o) => ({ ...o, status })),
          };
        }
        return order;
      })
    );
  };
  
  const handleApplyStatus = async (orderId) => {
    try {
      const order = orders.find((order) => order.orderDetails.id === orderId);
      const newStatus = order.orders[0].status;
      // Отправка запроса на сервер для обновления статуса заказа
      console.log(`Статус заказа ${orderId} изменен на ${newStatus}`);
    } catch (error) {
      console.error("Ошибка при обновлении статуса заказа:", error);
    }
  };
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать заказы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <div className="row">
    {orders.map((order) => (
      <div key={order.orderDetails.id} className="col-12 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <p><strong>ID заказа:</strong> {order.orderDetails.orderId}</p>
                <p><strong>ID пользователя:</strong> {order.orders[0].userId}</p>
                <p><strong>Сумма:</strong> {order.orderDetails.totalPrice} руб.</p>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor={`status-${order.orderDetails.id}`}>Статус:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`status-${order.orderDetails.id}`}
                    value={order.orders[0].status}
                    onChange={(e) => handleStatusChange(order.orderDetails.id, e.target.value)}
                  />
                </div>
                <Button
                  variant="success"
                  className="m-2"
                  onClick={() => handleApplyStatus(order.orderDetails.id)}
                >
                  Применить
                </Button>
                <Button className="m-2" variant="danger">Удалить</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditingOrders;