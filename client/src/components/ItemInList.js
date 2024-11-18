import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link} from "react-router-dom";
import {ITEMPAGE_ROUTE} from "../utils/consts"

const ItemInList = ({item})=> {
    return (
        <Col md={3} className="mb-4" >
             <Link to={ITEMPAGE_ROUTE + '/' + item.id} style={{ textDecoration: 'none' }}>
        <Card style={{ height: '100%' }}>
            <Card.Img style={{ maxWidth: '187px', maxHeight: '220px', margin: '0 auto' }} variant="top" src={process.env.REACT_APP_API_URL + item.imgMain} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Цена: {item.price} ₽
                    <br />
                    Рейтинг: {item.rating} / 5
                </Card.Text>
            </Card.Body>
        </Card>
        </Link>
    </Col>
    );
};

export default ItemInList;