import React, { useEffect, useState, useContext } from "react";
import { Context } from "../index";
import { fetchBascket, deleteFromBascket } from "../http/itemAPI";
import { Image, Button, Form, InputGroup } from "react-bootstrap";
import CreateOrder from "../components/modals/createOrder";

const Bascket = () => {
  const [orderVisible, setOrderVisible] = useState(false);
  const { user } = useContext(Context);
  const [bascket, setBascket] = useState([]);
  const userId = user.id;

  useEffect(() => {
    fetchBascket(userId).then((data) => {
      const updatedBascket = data.map((item) => ({
        ...item,
        count: item.count || 1, // Инициализация count значением 1, если оно отсутствует
      }));
      setBascket(updatedBascket);
    });
  }, []);

  const handleDelete = async (itemId) => {
    await deleteFromBascket(itemId);
    setBascket(bascket.filter((item) => item.item.id !== itemId));
  };

  const handleCountChange = (itemId, count) => {
    setBascket(
      bascket.map((item) => {
        if (item.item.id === itemId) {
          const maxAvailable = item.item_count.count;
          const newCount = Math.min(count, maxAvailable);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };
  
  return (
    <div className="container mt-5">
      <h4 className="ml-5">Корзина</h4>
      {bascket.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
      <div className="row justify-content-center">
        {bascket.map((item) => (
          <div key={item.id} className="col-lg-8 mb-4">
            <div className="row align-items-center">
              <div className="col-auto">
                <Image
                  src={process.env.REACT_APP_API_URL + item.item.imgMain}
                  alt={item.item.name}
                  width={180}
                  height={180}
                />
              </div>
              <div className="col">
                <h5>{item.item.name}</h5>
                <p className="mb-1">Цена: {item.item.price} руб.</p>
                <p className="mb-2">Доступно для заказа: {item.item_count.count}</p>
                <InputGroup style={{ maxWidth: "150px" }}></InputGroup>
              </div>
              <div className="col">
                <Form.Control
                  type="number"
                  value={item.count || 1}
                  onChange={(e) => handleCountChange(item.item.id, parseInt(e.target.value))}
                  placeholder="Количество"
                  aria-label="Количество для заказа"
                />
              </div>
              <div className="col">
                <Button variant="outline-danger" onClick={() => handleDelete(item.item.id)}>
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>)}
      {bascket.length === 0 ? (
        <p></p>
      ) : ( <Button variant="outline-dark" className="mt-1 w-100" onClick={() => setOrderVisible(true)}>
      Сделать заказ
    </Button>)}
      <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)} bascket={bascket} />
    </div>
  );
};

export default Bascket;
