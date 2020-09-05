import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  AddProduct,
  GetAllProducts,
  FiltredBytype,
} from "../R-Action/Product-Action";
import { ClearErrors } from "../R-Action/Alert-Action";
import { SetAlert } from "../R-Action/Alert-Action";
import { auth } from "../firebase/config";
import { LogOut } from "../R-Action/Auth-Action";
import { Segment, Dimmer, Loader} from "semantic-ui-react";

export const mapStateToProps = state => ({
  products: state.products,
  errors: state.someError,
  isLoading: state.isLoading,
  user: state.user,
  Filtred: state.productsFiltred,
});

export const mapDispatchToProps = {
  AddProduct,
  GetAllProducts,
  FiltredBytype,
  ClearErrors,
  SetAlert,
  LogOut,
};

const mainhoc = WrappedComponent => {
  // this is a react Function that return a function witch is connected to redux
  // return connect(mapStateToProps, mapDispatchToProps)(LoadingDataHOC); --> return function

  //--> this function return the Wrappedcomponent  ( jsx )
  // -->  we can write any logic in this function before the return
  const LoadingDataHOC = ({ errors, isLoading, ...props }) => {
    const [userStillConnected, setUserStillConnected] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        // --> fire base open a WebSoket that watch for changes
        if (user) {
          setUserStillConnected(true);
          dispatch(GetAllProducts());
        } else if (!user) {
          // let message = " Your are not Logged in pls try Again";
          // dispatch(SetAlert(message, "articles", 10000));
          setUserStillConnected(true);
          console.log("you are logged out ");
        }
      });

      return unsubscribe(); //--> we tell firebase to stop WebSoket if we leave the component
      // this prevent the rerender of the component
    }, [dispatch]);
    // lots on Condition
    return !userStillConnected ? (
      <h1> Sorry User Is Disconnected </h1>
    ) : userStillConnected && isLoading ? (
      <Segment className="h-all" basic>
        <Dimmer active inverted>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoadingDataHOC);
};

export default mainhoc;
