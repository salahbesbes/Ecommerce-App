import React, { useState, useRef, useEffect, createRef } from "react";
import ProductCard from "../Components/ProductCard";
import { Grid, Button, GridColumn, Ref, Sticky } from "semantic-ui-react";
import AddProductModal from "../Components/AddProductModal";
import MenuHover from "../Components/MenuHover";
import ReduxHoc from "../HOC/ReducHOC";

const Articles = ({ products, FiltredBytype, Filtred, name }) => {
  let openAddProductModal = useRef();
  let contextRef = createRef();
  let MenuHoverRedax = ReduxHoc(MenuHover); // --> it must be first lettre uppercase
  // --> we create a ref of the Button and we sent an instance of the ref as prop to the child component
  // and we create a hidden input type button to siulate the role of this button
  // so that we click in this commponent the event is listned from the child component
  const [dropDownValue, setDropDownValue] = useState([]);

  useEffect(() => {
    dropDownValue.map(el => FiltredBytype(el));
  }, [dropDownValue, FiltredBytype]);

  // handle hover Menu
  const [typeName, setName] = useState("");
  const [FiltredArray, setFiltredArray] = useState([]);
  // --> i used the typename we receive from the child and we did save it in the state so that i can filter a new array that i want
  useEffect(() => {
    let afterFilter = Filtred?.find((el, i) => el?.[typeName]);
    setFiltredArray(afterFilter?.[typeName]);
  }, [typeName]); // --> this rerun when ever a new type (button clicked ) receive

  return (
    <>
      <div className="x-center mb-20">
        <Button
          className="m-auto"
          size="massive"
          circular
          color="facebook"
          icon="add"
          onClick={() => openAddProductModal.current.click()}
        />
      </div>

      <Grid stackable relaxed doubling centered>
        <Ref innerRef={contextRef}>
          <Grid.Column>
            <Grid.Row>
              <Sticky context={contextRef} offset={10}>
                <MenuHoverRedax
                  // handelChangeType in the child component has a prop needed in this component
                  // setName receive  the prop like this and use it to my logic --> i save it into state
                  handelChangeType={name => setName(name)}
                />
              </Sticky>
            </Grid.Row>
            <Grid.Column verticalAlign="middle">
              <Grid stackable doubling centered>
                <Grid.Row columns={3}>
                  {/* {products?.map((el, i) => (
                    <GridColumn key={i}>
                      <ProductCard product={el} />
                    </GridColumn>
                  ))} */}
                  {FiltredArray?.map((el, i) => (
                    <GridColumn key={i}>
                      <ProductCard product={el} />
                    </GridColumn>
                  ))}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Column>
        </Ref>
      </Grid>
      <AddProductModal refBtn={openAddProductModal} />
      {/* <AdminModal /> */}
    </>
  );
};

export default Articles;
