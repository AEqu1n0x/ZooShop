import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../index";

const TypeBar = observer(() => {
  const { item } = useContext(Context);
  return (
    <div className="overflow-auto mt-1" style={{ maxHeight: "300px", maxWidth: "500px", wordWrap: "break-word" }}>
      <h6 className="mt-5">Выберите Тип</h6>
      <ListGroup>
        {item.types.map((type) => (
          <ListGroup.Item action active={type.id === item.SelectedType.id} variant="dark" key={type.id} onClick={() => item.setSelectedType(type)}>
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
});

export default TypeBar;
