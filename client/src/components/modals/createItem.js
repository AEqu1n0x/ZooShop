import React, { useContext, useState, useEffect } from "react";
import { Dropdown, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../index";
import { fetchTypes, fetchBrand, fetchPet, createItem } from "../../http/itemAPI";

const CreateItem = ({ show, onHide }) => {
  useEffect(() => {
    fetchTypes().then((data) => item.setTypes(data));
    fetchBrand().then((data) => item.SetBrands(data));
    fetchPet().then((data) => item.SetPets(data));
  }, []);

  const { item } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [infoCount, setInfoCount] = useState([{ count: 1 }]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [fileMain, setFileMain] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  const selectFileMain = (e) => {
    setFileMain(e.target.files);
  };
  const selectFile1 = (e) => {
    setFile1(e.target.files);
  };
  const selectFile2 = (e) => {
    setFile2(e.target.files);
  };

  const addItem = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("imgMain", fileMain[0]);
    formData.append("img1", file1[0]);
    formData.append("img2", file2[0]);
    formData.append("itemBrandId", selectedBrand ? selectedBrand.id : "");
    formData.append("itemTypeId", selectedType ? selectedType.id : "");
    formData.append("itemPetId", selectedPet ? selectedPet.id : "");
    formData.append("info", JSON.stringify(info));
    formData.append("infoCount", JSON.stringify(infoCount));
    createItem(formData)
      .then((data) => onHide())
      .catch((error) => {
        console.error("Ошибка при создании товара:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить новый товар</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex">
            <Dropdown className="m-2">
              <Dropdown.Toggle>Выбрать тип</Dropdown.Toggle>
              <Dropdown.Menu>
                {item.types.map((type) => (
                  <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="m-2">
              <Dropdown.Toggle>Выбрать бренд</Dropdown.Toggle>
              <Dropdown.Menu>
                {item.brands.map((brand) => (
                  <Dropdown.Item key={brand.id} onClick={() => setSelectedBrand(brand)}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="m-2">
              <Dropdown.Toggle>Выбрать питомца</Dropdown.Toggle>
              <Dropdown.Menu>
                {item.pets.map((pet) => (
                  <Dropdown.Item key={pet.id} onClick={() => setSelectedPet(pet)}>
                    {pet.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p>
            Выбрано: {selectedType ? selectedType.name : ""}, {selectedBrand ? selectedBrand.name : ""},{" "}
            {selectedPet ? selectedPet.name : ""}
          </p>
          <Form.Control onChange={(e) => setName(e.target.value)} value={name} placeholder="Название" className="mt-3" />
          <Form.Control
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
            placeholder="Стоимость"
            className="mt-3"
            type="number"
          />
          <Form.Control
            onChange={(e) => setInfoCount([{ count: Number(e.target.value) }])}
            value={infoCount[0].count}
            placeholder="Количество"
            className="mt-3"
            type="number"
          />
          <p className="mt-3">Главная Картинка</p>
          <Form.Control onChange={selectFileMain} placeholder="Картинка Главная" type="file" />
          <p className="mt-3">Доп. Картинка 1</p>
          <Form.Control onChange={selectFile1} placeholder="Картинка 1" type="file" />
          <p className="mt-3">Доп. Картинка 2</p>
          <Form.Control onChange={selectFile2} placeholder="Картинка 2" type="file" />

          <Button variant="warning" className="mt-3" onClick={addInfo}>
            Добавить описание
          </Button>
          {info.map((i) => (
            <Row className="mt-1" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo("title", e.target.value, i.number)}
                  placeholder="Название"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo("description", e.target.value, i.number)}
                  placeholder="Описание"
                />
              </Col>
              <Col md={4}>
                <Button variant="danger" onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="success" onClick={addItem}>
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItem;
