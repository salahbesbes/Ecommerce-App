import db, { firebaseTimestamp } from "../firebase/config";
import {
  get_all_products,
  get_product,
  add_product,
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
    let response = await db.collection("products").doc(id).get();
    let product = response.data();
    dispatch({ type: get_product, payload: product });
    console.log("we get One products");
  } catch (error) {
    console.log("error", error);
  }
};

export const AddProduct = formData => dispatch => {
  // this opject precvent the app from crashing when ever one of the properties is null
  const {
    title = "notitle",
    price = 0,
    CartQte = 1,
    rate = 0,
    description = "no description",
    imgUrl = "default",
  } = formData;
  let ProductRef = db.collection("products");
  ProductRef.add({
    title,
    price: +price, // --> number not a text
    rate,
    CartQte: +CartQte,
    DbQte: +CartQte,
    description,
    imgUrl,
    createdAt: firebaseTimestamp,
  });

  dispatch({ type: add_product });
  dispatch(GetAllProducts());
  console.log("We add the article");
};
