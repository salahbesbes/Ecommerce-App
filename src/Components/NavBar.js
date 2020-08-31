import React from "react";
import {
  Segment,
  Menu,
  Input,
  Icon,
  Label,
  Select,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogOut } from "../R-Action/Auth-Action";
const NavBar = ({ CartProducts, LogOut, user }) => {
  const options = [
    { key: "all", text: "All", value: "all" },
    { key: "articles", text: "Articles", value: "articles" },
    { key: "products", text: "Products", value: "products" },
  ];
  return (
    <div>
      <Segment className="seg-menu" inverted textAlign="center">
        <Menu fluid inverted secondary stackable>
          <Menu.Menu position="left">
            <Menu.Item>
              <Link to="/articles">
                <Icon name="home" size="large" color="yellow" />
                Home
              </Link>
            </Menu.Item>
          </Menu.Menu>
          <div className="w-300">
            <Input type="text" placeholder="Search..." action fluid>
              <input />
              <Select compact options={options} defaultValue="articles" />
              <Button color="blue" type="submit">
                Search
              </Button>
            </Input>
          </div>
          <Menu.Menu position="right">
            {!user ? (
              <>
                <Menu.Item as={"div"}>
                  <Link to="/signup">
                    <Icon name="signup" size="large" color="orange" />
                    SignUp
                  </Link>
                </Menu.Item>
                <Menu.Item as={"div"}>
                  <Link to="/login">
                    <Icon name="sign in" size="large" color="orange" />
                    Login
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Icon name="star outline" size="large" color="yellow" />
                  Favoris
                </Menu.Item>
                <Menu.Item as={"div"}>
                  <Link to="/cart">
                    <Icon name="cart" size="large" color="orange" />
                    Cart
                    {CartProducts.length > 0 ? (
                      <Label className="w-5" color="teal" floating>
                        {CartProducts.length}
                      </Label>
                    ) : null}
                  </Link>
                </Menu.Item>
                <Menu.Item onClick={LogOut} as="div">
                  <Link to="/signup">
                    <Icon name="log out" size="large" color="orange" />
                    SignOut
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  );
};

let mapstatetoprops = state => {
  return {
    CartProducts: state.cart,
    user: state.user,
  };
};

export default connect(mapstatetoprops, { LogOut })(NavBar);
