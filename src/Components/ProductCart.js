import React, { useState } from "react";
import { Item, Header, Button, Message, Icon,  } from "semantic-ui-react";
import { HandelQuantityCart, DeletefromCart } from "../R-Action/Cart-Action";
import { connect } from "react-redux";
const ProductCart = ({ item, DeletefromCart, HandelQuantityCart }) => {
  const [CartQte, setCartQte] = useState(1);
  const { title, description, imgUrl, uid } = item;

  const handelPlus = uid => {
    setCartQte(CartQte + 1);
    HandelQuantityCart(uid, CartQte + 1);
  };
  const handelMinus = uid => {
    setCartQte(CartQte - 1);
    HandelQuantityCart(uid, CartQte - 1);
  };
  return (
    <Item>
      <Item.Image size="small" src={imgUrl} />

      <Item.Content>
       
        <h2>{title}</h2> <br />
        <Header as="h3"> $10.99 </Header>
        <Item.Description>
          <p>{description}</p>
          <p>
            Many people also have their own barometers for what makes a cute
            dog.
          </p>
        </Item.Description>
        <Button icon="minus" onClick={() => CartQte > 0 && handelMinus(uid)} />
        <Message size="mini" compact>
          {CartQte}
        </Message>
        <Button icon="plus" onClick={() => handelPlus(uid)} />
       
      </Item.Content>
      <Icon
          
          onClick={() => DeletefromCart(uid)}
          name="close"
          size="large"
          color="red"
        />
      <Icon name="heart outline" size="large" color="yellow" />
    </Item>
  );
};

let mapstatetoprops = state => {
  return {};
};

export default connect(mapstatetoprops, {
  DeletefromCart,
  HandelQuantityCart,
})(ProductCart);
