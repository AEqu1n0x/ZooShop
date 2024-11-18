import React, { useState, useContext } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTE, AUTH_ROUTE } from "../utils/consts";
import { registration, Login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === AUTH_ROUTE;

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  let navigate = useNavigate();
  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await Login(login, password);
      } else {
        data = await registration(email, phone, name, surname, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate('/catalog');
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 300 }}>
      <Card style={{ width: 500 }} className="p-5">
        <h3 className="m-auto">{isLogin ? "Авторизация" : "Регистарция"}</h3>
        <Form className="d-flex flex-column">
          {isLogin ? (
            <div>
              <Form.Control
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mt-2"
                placeholder="Введите логин"
              />
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                placeholder="Введите пароль"
              />
            </div>
          ) : (
            <div>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                placeholder="Введите Ваш email"
              />
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
                placeholder="Введите номер телефона"
              />
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                placeholder="Введите Имя"
              />
              <Form.Control
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="mt-2"
                placeholder="Введите Фамилию"
              />
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                placeholder="Введите пароль"
              />
            </div>
          )}

          {isLogin ? (
            <Button onClick={click} className="mt-3" variant="outline-dark">
              Войти
            </Button>
          ) : (
            <Button onClick={click} className="mt-3" variant="outline-dark">
              Зарегестрироваться
            </Button>
          )}
          {isLogin ? (
            <div className="mt-3">
              Все еще не с нами?{" "}
              <NavLink to={REGISTRATION_ROUTE}>
                <Button variant="outline-dark"> Регистрация</Button>
              </NavLink>
            </div>
          ) : (
            <div className="mt-3">
              Есть аккаунт?{" "}
              <NavLink to={AUTH_ROUTE}>
                <Button variant="outline-dark"> Авторизоваться</Button>
              </NavLink>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
