import { v4 as uuid } from "uuid";
import {
  update_user_profile,
  get_all_products,
  get_product,
  login,
  add_product_to_Cart,
  delete_product_from_cart,
  Cart_quantity,
  client_check_out,
  Set_Error,
  remove_Alert,
  Clear_Errors,
  sign_up,
  log_out,
  isLoading,
  filter_by_type,
} from "../R-Const/TypeofAction";

const initState = {
  user: null,
  userProfile: null,
  products: [],
  product: {},
  cart: [],
  someError: [],
  isLoading: false,
  userStillConnected: null,
  productsFiltred: [],
};

/*

 {
      CartQte: 1,
      DbQte: 80,
      price: 50,
      rate: 5,
      description: "this is a test",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-web-app-2f4fa.appspot.com/o/prodImages%2Fdc43b5b84bf1381e16c20c4dcad1d553.jpg?alt=media&token=8ead4f03-8f36-44c6-b8e9-8ff9b0045609",
      title: "t-shirt",
      uid: "0XkWeBt78HwTXn69Vrp5",
    },

*/
const mainReducer = (state = initState, action) => {
  // action --> type , payload
  const { type, payload } = action;
  switch (type) {
    case isLoading:
      return { ...state, isLoading: !state.isLoading };
    case log_out:
      return initState;
    case update_user_profile:
      return { ...state, userProfile: payload };
    case sign_up:
      return {
        ...state,
        user: payload.CurrentUser,
        userProfile: payload.UserProfile,
      };
    case login:
      return {
        ...state,
        user: payload.CurrentUser,
        userProfile: payload.UserProfile,
      };
    case get_all_products:
      return { ...state, products: payload };

    case get_product:
      return { ...state, product: payload };

    case add_product_to_Cart:
      let id = uuid();
      let message = "item was found in the cart";
      let findProduct = state.products.find(el => el.uid === payload); // --> we found the product from the products list and we ge it
      // let cartProduct = { ...findProduct.data(), uid: payload }; // we add to it the id cause we need it to identify it
      return state.cart.some(elem => elem.uid === findProduct.uid) // if it is already exists we send some error message  ( some return true or false exist or not )
        ? {
            ...state,
            someError: [
              ...state.someError,
              { message, id, key: id, type: "articles" },
            ],
          }
        : { ...state, cart: [findProduct, ...state.cart] };

    case delete_product_from_cart:
      let newCart = state.cart.filter(el => el.uid !== payload);
      return { ...state, cart: newCart };

    case Cart_quantity:
      let newCartArray = state.cart.map(el =>
        el.uid === payload.uid ? { ...el, CartQte: payload.CartQte } : el
      );
      return {
        ...state,
        cart: newCartArray,
      };
    case client_check_out:
      return state;

    case Set_Error:
      return { ...state, someError: [...state.someError, payload] };
    case remove_Alert:
      return {
        ...state,
        someError: state.someError.filter(el => el.id !== payload),
      };
    case Clear_Errors:
      return { ...state, someError: [] };
    case filter_by_type:
      let newarray = state.products.filter(el => el.type === payload); // payload is string
      let propertiesNameExist = state.productsFiltred.some(
        el => Object.getOwnPropertyNames(el)[0] === payload
      );

      return !propertiesNameExist
        ? {
            ...state,
            productsFiltred: [
              ...state.productsFiltred,
              { [payload]: newarray },
            ],
          }
        : state;

    default:
      return state;
  }
};
export default mainReducer;
