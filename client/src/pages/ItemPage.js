import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import { fetchOneItem, addToBascket } from "../http/itemAPI";
import CreateRate from "../components/modals/createReview";
import ScrollRating from "../components/scrollRating";
import { Context } from "../index";
import { DELIVERY_ROUTE, GARANT_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";

const ItemPage = () => {
  const { user } = useContext(Context);

  const [item, setItem] = useState({ info: [], infoCount: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneItem(id).then((data) => setItem(data));
  }, []);

  const count = item.infoCount[0]?.count;
  const displayCount = count !== undefined && count !== 0 ? count : 0;

  const [rateVisible, setRateVisible] = useState(false);

  const addBascket = () => {
    const formData = new FormData();
    formData.append("itemId", id);

    addToBascket(formData)
      .then((data) => {
        alert("Товар в корзине!");
      })
      .catch((error) => {
        alert("Товар уже есть в корзине!");
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Carousel style={{ maxWidth: "419px" }}>
            <Carousel.Item>
              <img className="d-block w-100" src={process.env.REACT_APP_API_URL + item.imgMain} alt="1 slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={process.env.REACT_APP_API_URL + item.img1} alt="2 slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={process.env.REACT_APP_API_URL + item.img2} alt="3 slide" />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={5}>
          <div>
            <p className="my-1">Наименование:</p>
            <h2>{item.name}</h2>
            <p className="my-2">Цена:</p>
            <h2>{item.price} ₽</h2>
            <p className="my-2">Рейтинг:</p>
            <h2>{item.rating} / 5</h2>
            <p className="my-2">Осталось в наличии: {displayCount}</p>
            {displayCount !== 0 && user.isAuth && (
              <Button className="mt-1" variant="outline-dark" onClick={addBascket}>
                Добавить в корзину
              </Button>
            )}
            <p className="my-2">Дополнительная информация:</p>
            <NavLink to={DELIVERY_ROUTE} style={{color: "black",textDecoration: "none" }}><h5>Доставка</h5></NavLink>
            <NavLink to={GARANT_ROUTE} style={{color: "black",textDecoration: "none" }}><h5>Гарантия</h5></NavLink>
          </div>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-5 ml-5">
        <h4>Описание</h4>
        {item.info.map((info) => (
          <Row key={info.id}>
            <h6>{info.title}</h6>
            <p>{info.description}</p>
          </Row>
        ))}
      </Row>
      {user.isAuth ? (
        <Row className="m-5 justify-content-center align-items-center">
          <h4 className="text-center">Оставьте отзыв!</h4>
          <Button variant="outline-dark" className="mt-1 w-50" onClick={() => setRateVisible(true)}>
            Добавить отзыв
          </Button>
        </Row>
      ) : (
        <Row className="m-5 justify-content-center align-items-center">
          <h4 className="text-center">Авторизуйтесь, чтобы оставить отзыв</h4>
        </Row>
      )}
      <CreateRate show={rateVisible} onHide={() => setRateVisible(false)} />
      <ScrollRating />
    </Container>
  );
};

export default ItemPage;
