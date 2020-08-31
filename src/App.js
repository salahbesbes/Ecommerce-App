import React, { useEffect } from "react";
import "./App.css";

import { Container } from "semantic-ui-react";
import Articles from "./Pages/Articles";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ProductDetails from "./Pages/PrductDetails";
import Cart from "./Pages/Cart";
import NavBar from "./Components/NavBar";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
function App() {
  useEffect(() => {
    // LogIn();
    // updateUserProfile();
    // getUserProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/:id/details" component={ProductDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </Container>
    </>
  );
}

let mapstatetoprops = () => {
  return {};
};

export default connect(mapstatetoprops, {})(App);
