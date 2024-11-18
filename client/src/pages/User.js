import React, { useState, useEffect } from "react";
import { getUserCabinet, getUserOrders } from "../http/userAPI";
import OrderModal from "../components/modals/orderModal";
import {Button } from "react-bootstrap";

const User = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserCabinet();
      setUser(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getUserOrders();
      setOrders(data.userOrders);
    };
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card border-0 shadow">
          <div className="card-body text-center">
            <h2 className="mb-4">Личный кабинет</h2>
            <h4>
              {user.name} {user.surname}
            </h4>
            <p className="text-muted">{user.role}</p>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <p>
                  <strong>Телефон:</strong>
                </p>
                <p>{user.phone}</p>
              </div>
              <div className="col-sm-6">
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <h3 className="mt-5 mb-4">Заказы</h3>
      <div className="row">
        {orders.map((order) => (
          <div key={order.orderDetails.id} className="col-md-6 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5 className="card-title">Заказ #{order.orderDetails.orderId}</h5>
                <p className="card-text">
                  <strong>Итоговая цена:</strong> {order.orderDetails.totalPrice} руб.
                </p>
                <p className="card-text">
                  <strong>Статус:</strong> В обработке
                </p>
                <Button variant="outline-dark" onClick={() => openModal(order)}>
                  Посмотреть
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderModal order={selectedOrder} show={showModal} onHide={closeModal} />
      )}
    </div>
  );
};

export default User;