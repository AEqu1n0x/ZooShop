import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateType from "../components/modals/createType";
import CreateBrand from "../components/modals/createBrand";
import CreatePet from "../components/modals/createPet";
import CreateItem from "../components/modals/createItem";
import DeleteBrand from "../components/modals/deleteBrand";
import DeleteType from "../components/modals/deleteType";
import DeletePet from "../components/modals/deletePet";
import DeleteItem from "../components/modals/deleteItem";
import EditingOrders from "../components/modals/editingOrders";
import EditingUsers from "../components/modals/editingUsers";
import UpdateCount from "../components/modals/updateCount";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchAllItems } from "../http/itemAPI";
import { fetchAllOrders } from "../http/itemAPI";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [petVisible, setPetVisible] = useState(false);
  const [itemVisible, setItemVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);


  const [deletebrandVisible, deletesetBrandVisible] = useState(false);
  const [deletetypeVisible, deletesetTypeVisible] = useState(false);
  const [deletepetVisible, deletesetPetVisible] = useState(false);
  const [deleteitemVisible, deletesetItemVisible] = useState(false);

  const [orderVisible, setorderVisible] = useState(false);
  const [userVisible, setuserVisible] = useState(false);

  // функция для формирования excel со списком товаров
  const handleDownloadItems = async () => {
    try {
      const data = await fetchAllItems();
      const sortedItems = data.rows.sort((a, b) => a.id - b.id);
      const formattedData = sortedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      }));
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Список товаров");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Список товаров.xlsx");
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
    }
  };

  // функция для формирования excel со списком заказов
  const handleDownloadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      const formattedData = data.allOrders.map((order) => {
        const { orderDetails, orderedItems } = order;
        const items = orderedItems.map((item) => `${item.item.name} (${item.count})`).join(", ");
        return {
          "Номер заказа": orderDetails.id,
          "Имя заказчика": `${orderDetails.name} ${orderDetails.surname}`,
          "Номер телефона": orderDetails.phone,
          Email: orderDetails.email,
          Адрес: `${orderDetails.postcode}, ${orderDetails.country}, ${orderDetails.city}, ${orderDetails.street}, ${orderDetails.apartment}`,
          "Полная стоимость": orderDetails.totalPrice,
          "Дата заказа": new Date(orderDetails.dateOrder).toLocaleDateString(),
          "Дата доставки": new Date(orderDetails.dateDelivery).toLocaleDateString(),
          Товары: items,
        };
      });
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Список заказов");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Список заказов.xlsx");
    } catch (error) {
      console.error("Ошибка при получении списка заказов:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="flex-column">
          <h5 style={{fontSize:'20px'}} className="mt-4">Редактирование типов</h5>
          <Button style={{fontSize:'20px'}} variant="outline-success" className="mt-1 w-100" onClick={() => setTypeVisible(true)}>
            Добавить тип
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-3 w-100">
            Редактировать тип
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-danger" className="mt-3  w-100" onClick={() => deletesetTypeVisible(true)}>
            Удалить тип
          </Button>
        </Col>
        <Col className="flex-column">
          <h5 style={{fontSize:'20px'}} className="mt-4">Редактирование брендов</h5>
          <Button style={{fontSize:'20px'}} variant="outline-success" className="mt-1  w-100" onClick={() => setBrandVisible(true)}>
            Добавить бренд
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-3 w-100">
            Редактировать бренд
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-danger" className="mt-3  w-100" onClick={() => deletesetBrandVisible(true)}>
            Удалить бренд
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="flex-column">
          <h5 style={{fontSize:'20px'}} className="mt-4">Редактирование типа питомца</h5>
          <Button style={{fontSize:'20px'}} variant="outline-success" className="mt-1  w-100" onClick={() => setPetVisible(true)}>
            Добавить тип питомца
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-3 w-100">
            Редактировать тип питомца
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-danger" className="mt-3  w-100" onClick={() => deletesetPetVisible(true)}>
            Удалить тип питомца
          </Button>
        </Col>
        <Col className="flex-column">
          <h5 style={{fontSize:'20px'}} className="mt-4">Редактирование товара</h5>
          <Button style={{fontSize:'20px'}} variant="outline-success" className="mt-1 w-100" onClick={() => setItemVisible(true)}>
            Добавить новый товар
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-3 w-100">
            Редактировать товар
          </Button>
          <Button style={{fontSize:'20px'}} variant="outline-danger" className="mt-3 w-100" onClick={() => deletesetItemVisible(true)}>
            Удалить товар
          </Button>
        </Col>
      </Row>
      <Row>
        <h5 style={{fontSize:'20px'}} className="mt-4">Работа с данными</h5>
        <Button style={{fontSize:'20px'}} variant="outline-success" className="m-1 mr-1 w-50" onClick={handleDownloadItems}>
          Скачать список товаров
        </Button>
        <Button style={{fontSize:'20px'}} variant="outline-success" className="m-1 w-50" onClick={handleDownloadOrders}>
          Скачать список заказов
        </Button>
        <Button style={{fontSize:'20px'}} variant="outline-primary" className="m-1 w-50" onClick={() => setUpdateVisible(true)}>
          Обновить товары
        </Button>
      </Row>
      <Row>
        <h5 style={{fontSize:'20px'}} className="mt-1">Редактирование заказов</h5>
        <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-1 w-50" onClick={() => setorderVisible(true)}>
          Редактировать заказы
        </Button>
      </Row>
      <Row>
        <h5 style={{fontSize:'20px'}} className="mt-1"> Редактирование Пользователей</h5>
        <Button style={{fontSize:'20px'}} variant="outline-warning" className="mt-1 w-50" onClick={() => setuserVisible(true)}>
          Редактировать Пользователей
        </Button>
      </Row>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreatePet show={petVisible} onHide={() => setPetVisible(false)} />
      <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />

      <DeleteBrand show={deletebrandVisible} onHide={() => deletesetBrandVisible(false)} />
      <DeleteType show={deletetypeVisible} onHide={() => deletesetTypeVisible(false)} />
      <DeletePet show={deletepetVisible} onHide={() => deletesetPetVisible(false)} />
      <DeleteItem show={deleteitemVisible} onHide={() => deletesetItemVisible(false)} />
      <EditingOrders show={orderVisible} onHide={() => setorderVisible(false)} />
      <EditingUsers show={userVisible} onHide={() => setuserVisible(false)} />
      <UpdateCount show={updateVisible} onHide={() => setUpdateVisible(false)} />
    </Container>
  );
};

export default Admin;
