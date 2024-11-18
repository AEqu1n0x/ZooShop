import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import PetBar from "../components/PetBar";
import BrandBar from "../components/BrandBar";
import ItemList from "../components/ItemList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchTypes,fetchBrand, fetchPet, fetchItem } from "../http/itemAPI";
import { alignPropType } from "react-bootstrap/esm/types";
import Pages from "../components/Pagination";


const Catalog = observer(() => {
  const {item} = useContext(Context)

  useEffect(()=>{
    fetchTypes().then(data=>item.setTypes(data))
    fetchBrand().then(data=>item.SetBrands(data))
    fetchPet().then(data=>item.SetPets(data))
  },[])

  useEffect(() => {
    if (item.SelectedType && item.SelectedBrand && item.SelectedPet) {
      fetchItem(item.SelectedType.id, item.SelectedBrand.id, item.SelectedPet.id, 8, item.page).then((data) => {
        item.SetItems(data.rows);
        item.SetTotalCount(data.count);
      });
    }
  }, [item.page, item.SelectedType, item.SelectedBrand, item.SelectedPet]);


  const handleResetFilter = () => {
    item.setSelectedType({}); 
    item.setSelectedBrand({}); 
    item.setSelectedPet({}); 
    item.SetPage(1); 
  
    fetchItem({}, {}, {}, 8, 1).then((data) => {
      item.SetItems(data.rows);
      item.SetTotalCount(data.count);
    });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
          <Button variant="dark" className="mt-2" onClick={handleResetFilter}>Сбросить фильтрацию</Button>
        </Col>
        <Col md={9} className="position-relative top-neg-1">
          <PetBar/>
          <ItemList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Catalog;
