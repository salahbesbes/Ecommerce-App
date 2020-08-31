import db from "../firebase/config";
import {
  add_product_to_Cart,
  delete_product_from_cart,
  Cart_quantity,
  client_check_out,

} from "../R-Const/TypeofAction";
import { SetAlert } from "./Alert-Action";


export const AddtoCart = id => dispatch => {
  
  dispatch({
    type: add_product_to_Cart,
    payload: id,
  });
};
export const DeletefromCart = id => dispatch => {
  dispatch({ type: delete_product_from_cart, payload: id });
};

export const HandelQuantityCart = (uid, CartQte) => dispatch => {
  dispatch({ type: Cart_quantity, payload: { uid, CartQte } });
};

export const ClientCheckOut = Cart => async dispatch => {
  for (let i = 0; i <= Cart.length - 1; i++) {
    const DocRef = db.collection("products").doc(Cart[i].uid);
    try {
      if (Cart[i].DbQte - Cart[i].CartQte > 0) {
        db.runTransaction(async function (transaction) {
          // This code may get re-run multiple times if there are conflicts.
          let doc = await transaction.get(DocRef);
          var newDbQte = doc.data().DbQte - Cart[i].CartQte;
          transaction.update(DocRef, { DbQte: newDbQte });
          console.log('u just succeeded ur checkout')
        });
      } else {
        let message = `Sorry , ${Cart[i].title} article is no more availble`;
        dispatch(SetAlert(message, "cart"));
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  dispatch({ type: client_check_out });
};
