import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateCount = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Обновить товары</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <h6>Загрузите файл в формате "редактора таблиц"</h6>
          <Form.Control className="mt-3" placeholder="Картинка" type="file" />
        </Form>
      </Modal.Body>
      <div className="m-2">
      <h5>Успешно обновлено элементов - 3</h5>
      <h5>Не удалось обновить следующий товар*:</h5>
      <tr>
        <td style={{ padding: '6px' }}>Название</td>
        <td style={{ padding: '6px' }}>Кол-во</td>
        <td style={{ padding: '6px' }}>Цена</td>
      </tr>
      <tr>
        <td style={{ padding: '6px' }}><h6>Кормушка</h6></td>
        <td style={{ padding: '6px' }}>53</td>
        <td style={{ padding: '6px' }}>500</td>
      </tr>
      <tr>
        <td style={{ padding: '6px' }}><h6>TEST</h6></td>
        <td style={{ padding: '6px' }}>54</td>
        <td style={{ padding: '6px' }}>600</td>
      </tr>
      <h7>*Не найден товар по названию</h7>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="success">
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCount;