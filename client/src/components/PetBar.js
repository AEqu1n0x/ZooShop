import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "../index";

const PetBar = observer(() => {
  const { item } = useContext(Context);

  return(
  <Row className="d-flex">
    {item.pets.map(pet =>
        <Card style={{cursor:'pointer'}} key={pet.id} className="p-3 col-2 m-1" onClick={()=>item.setSelectedPet(pet)} border={pet.id === item.SelectedPet.id ? 'dark': 'light'}>
            {pet.name}
        </Card>
    )}
  </Row>
  );
});

export default PetBar;
