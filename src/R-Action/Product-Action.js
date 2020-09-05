import db, { firebaseTimestamp } from "../firebase/config";
import {
  get_all_products,
  get_product,
  add_product,
  filter_by_type,
  isLoading,
} from "../R-Const/TypeofAction";

export const GetAllProducts = () => async dispatch => {
  try {
    // --> this code makes the component rerender
    // db.collection("products")
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot(snapshot => {
    //     // --> watch on colllection change
    //     console.log("snapshot", snapshot.docs);
    //     let products = snapshot.docs.map(el => ({ uid: el.id, ...el.data() }));
    //     dispatch({ type: get_all_products, payload: products });
    //   });
    dispatch({ type: isLoading });
    let products = await db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
    let payload = products.docs.map(el => ({ uid: el.id, ...el.data() }));
    dispatch({ type: get_all_products, payload });
    dispatch({ type: isLoading });

    console.log("we get all products");
  } catch (error) {
    console.log("error", error);
  }
};

export const getOneproduct = id => async dispatch => {
  try {
    dispatch({ type: isLoading });
    let response = await db.collection("products").doc(id).get();
    let product = response.data();
    dispatch({ type: get_product, payload: product });
    dispatch({ type: isLoading });
    console.log("we get One products");
  } catch (error) {
    console.log("error", error);
  }
};

export const AddProduct = formData => dispatch => {
  // this opject precvent the app from crashing when ever one of the properties is null
  const { price = 0, DbQte = 10 } = formData;
  let ProductRef = db.collection("products");
  ProductRef.add({
    ...formData,
    price: +price, // --> number not a text

    DbQte: +DbQte,

    createdAt: firebaseTimestamp,
  });

  dispatch({ type: add_product });
  dispatch(GetAllProducts());
  console.log("We add the article");
};

export const FiltredBytype = type => async dispatch => {
  try {
    // dispatch({ type: isLoading });
    // let ProductRef = db.collection("products");
    // let res = await ProductRef.where("type", "==", type).get();
    // let payload = res.docs.map(el => ({ ...el.data(), uid: el.id }));

    // dispatch({ type: isLoading });
    dispatch({ type: filter_by_type, payload: type });
  } catch (error) {
    console.log("error", error);
  }
};
