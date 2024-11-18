import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
  const { item } = useContext(Context);
  return (
    <div className="overflow-auto mt-5" style={{ maxHeight: "300px", maxWidth: "500px", wordWrap: "break-word" }}>
      <h6>Выберите бренд</h6>
      <ListGroup>
        {item.brands.map((brand) => (
          <ListGroup.Item action active={brand.id === item.SelectedBrand.id} variant="dark" key={brand.id} onClick={() => item.setSelectedBrand(brand)}>
            {brand.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
});

export default BrandBar;
