import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MAIN_ROUTE, AUTH_ROUTE, ADMIN_ROUTE, USER_ROUTE, CATALOG_ROUTE, BASCKET_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  const logOut = () => {
    localStorage.removeItem("token");
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex align-items-center">
        <NavLink to={MAIN_ROUTE} style={{ color: "white", textDecoration: "none", fontSize: "25px" }}>
          ZooShop
        </NavLink>
        <Nav className="d-flex align-items-center">
          <NavLink
            to={CATALOG_ROUTE}
            className="m-2"
            style={{ color: "white", fontSize: "18px", paddingLeft: "50px", textDecoration: "none" }}
          >
            Каталог
          </NavLink>
          <NavLink className="m-2" to={BASCKET_ROUTE} style={{ color: "white", fontSize: "18px", textDecoration: "none" }}>
            Корзина
          </NavLink>
        </Nav>
        {user.isAuth ? (
          <Nav className="ms-auto">
            {user.role === "ADMIN" && (
              <NavLink to={ADMIN_ROUTE}>
                
                <Button variant="outline-light" style={{ marginRight: "8px" }}>
                  Админ панель
                </Button>
              </NavLink>
            )}
            <NavLink to={USER_ROUTE}>
              <Button style={{ marginRight: "8px" }} variant="outline-light">Кабинет</Button>
            </NavLink>
            <Button variant="outline-light" onClick={() => logOut()}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <NavLink to={AUTH_ROUTE}>
              <Button variant="outline-light">Авторизоваться</Button>
            </NavLink>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
