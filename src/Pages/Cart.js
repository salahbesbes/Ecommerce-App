import React, { createRef, useState } from "react";
import {
  Container,
  Grid,
  Segment,
  Button,
  Item,
  Label,
  Table,
  Ref,
  Sticky,
  Modal,
  Message,
} from "semantic-ui-react";
import CheckOut from "../Components/CheckOut";
import { connect } from "react-redux";
import { ClientCheckOut } from "../R-Action/Cart-Action";
import ProductCart from "../Components/ProductCart";
const Cart = ({ CartProducts, ClientCheckOut, errors }) => {
  let contextRef = createRef();
  const [isOpen, setIsOpen] = useState(false);

  let totalPrice = CartProducts.map(el => el.price * el.CartQte).reduce(
    (a, b) => +a + +b,
    0
  );
  return (
    <Container>
      
      {// --> verify if the errors is not empty then if the first error is of type cart (the name of this file)
      errors.length > 0 && errors[0].type === "cart" && ( 
        <Message
          error
          header="Some this is Wrong"
          list={errors.map(el => el.message)}
        />
      )}
      <Grid columns={2} stackable  relaxed>
        <Grid.Row>
          <Grid.Column width="10">
            <Item.Group divided>
              {CartProducts.map((el, i) => (
                <ProductCart item={el} key={i} />
              ))}
            </Item.Group>
          </Grid.Column>
          <Grid.Column stretched width='5'>
            <Ref innerRef={contextRef}>
              <Segment>
                <Sticky context={contextRef} offset={50}>
                  <Table celled stackable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell> Check Out </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <p>
                            u have [{CartProducts.length}] product in your Cart
                          </p>
                          <br />
                          {CartProducts.map((el, i) => (
                            <p key={i}>
                              <span key={i}>{el.title} </span>
                              <span> * {el.CartQte} </span> <br />
                            </p>
                          ))}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          Total Amount To pay :
                          <Label basic color="red">
                            ${totalPrice}
                          </Label>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.Cell>
                          <Button
                            onClick={() => setIsOpen(!isOpen)}
                            fluid
                            color="teal"
                          >
                            Chek Out
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </Sticky>
              </Segment>
            </Ref>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal size="large" open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Check Out Total amount of : {totalPrice}$ </Modal.Header>
        <Modal.Content>
          <CheckOut />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setIsOpen(false)}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              setIsOpen(false);
              ClientCheckOut(CartProducts);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

let mapstatetoprops = state => {
  return {
    CartProducts: state.cart,
    errors: state.someError,
  };
};

export default connect(mapstatetoprops, {
  ClientCheckOut,
})(Cart);
