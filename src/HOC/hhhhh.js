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
  const LoadingDataHOC = ({ user, isLoading, ...props }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
      GetAllProducts();
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }, []);

    return !user ? (
      <h1>No User Connected </h1>
    ) : user && isLoading ? (
      <h1>component is loading</h1>
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoadingDataHOC);
};

export default mainhoc;
