import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ItemInList from "./ItemInList";

const ItemList = observer(() => {
  const { item } = useContext(Context);

  return (
    <Row className="d-flex">
      {item.items.length > 0 ? (
        item.items.map((item) => <ItemInList key={item.id} item={item} />)
      ) : (
        <h5 className="mt-2 ml-5">Ничего не найдено</h5>
      )}
    </Row>
  );
});

export default ItemList;