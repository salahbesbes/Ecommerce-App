import React from "react";
import { connect } from "react-redux";
import {
  AddProduct,
  GetAllProducts,
  FiltredBytype,
} from "../R-Action/Product-Action";
import { ClearErrors } from "../R-Action/Alert-Action";
import { SetAlert } from "../R-Action/Alert-Action";
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
  const LoadingDataHOC = ({ ...props }) => {
    return <WrappedComponent {...props} />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoadingDataHOC);
};

export default mainhoc;
