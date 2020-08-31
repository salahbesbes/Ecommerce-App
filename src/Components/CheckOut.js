import React from "react";
import {
  Table,
  Button,
  Icon,

} from "semantic-ui-react";
import { connect } from "react-redux";
import { DeletefromCart } from "../R-Action/Cart-Action";

const CheckOut = ({ DeletefromCart, CartProducts }) => {
  let totalPrice = CartProducts.map(el => el.price * el.CartQte).reduce(
    (a, b) => +a + +b,
    0
  );

  return (
    <Table compact celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {CartProducts.map((el, i) => (
          <Table.Row key={i}>
            <Table.Cell>{el.title}</Table.Cell>
            <Table.Cell>{el.price}</Table.Cell>
            <Table.Cell>{el.CartQte}</Table.Cell>
            <Table.Cell>{el.CartQte * el.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
          
              <Button
                floated="left"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="shop" /> Return Shopping
              </Button>
              <Button floated="right" basic size="small" color="blue">
                {totalPrice} $
              </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

let mapstatetoprops = state => {
  return {
    CartProducts: state.cart,
  };
};

export default connect(mapstatetoprops, { DeletefromCart })(CheckOut);
