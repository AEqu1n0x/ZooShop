import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../../http/userAPI";
import { Button, Modal, Table, Form } from "react-bootstrap";

const EditingUsers = ({ show, onHide }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Ошибка при получении списка пользователей:", error);
    }
  };

  const handleRoleChange = (userId, role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, role };
        }
        return user;
      })
    );
  };

  const handleApplyRole = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const newRole = user.role;
      // Отправка запроса на сервер для обновления роли пользователя
      console.log(`Роль пользователя ${userId} изменена на ${newRole}`);
    } catch (error) {
      console.error("Ошибка при обновлении роли пользователя:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактировать Пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя/Фамилия</th>
              <th>Телефон</th>
              <th>Почта</th>
              <th>Дата регистрации</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.name} {user.surname}
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {user.role !== "ADMIN" && (
                    <Form.Control as="select" value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                      <option value="USER">USER</option>
                      <option value="BANNED">BANNED</option>
                    </Form.Control>
                  )}
                </td>
                <td>
                  {user.role !== "ADMIN" && (
                    <Button variant="success" size="sm" onClick={() => handleApplyRole(user.id)}>
                      Применить
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditingUsers;
