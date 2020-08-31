import db from "../firebase/config";
import { login, sign_up, log_out } from "../R-Const/TypeofAction";
import { auth } from "firebase";
import { SetAlert } from "./Alert-Action";

export const LogOut = () => dispatch => {
  auth().signOut();
  localStorage.removeItem("token");
  dispatch({ type: log_out });
};

export const LogIn = formData => async dispatch => {
  try {
    let err = await auth().signInWithEmailAndPassword(
      formData.email,
      formData.password
    );
    err.exist && console.log("err.message", err.message);
    let user = auth().currentUser;
    let CurrentUser = user.providerData[0]; // --> obj predefined containing crusal properties
    let response = await db.collection("users").doc(user.uid).get(); // we get the id from current id and create a doc with the same id
    let UserProfile = response.data(); // accessible profile doc

    dispatch({
      type: login,
      payload: {
        // we pass 2 object
        CurrentUser: { ...CurrentUser, uid: user.uid }, // we add the id to the obj we create
        UserProfile, // we paass the profile we get
      },
    });
    // --> we get the token that firebase create
    let token = user.refreshToken;
    // --> we save the token to the local storage of the borowser
    localStorage.setItem("token", token);

    console.log("success login");
  } catch (error) {
    console.log("error", error);
  }
};

export const Signup = user => async dispatch => {
  try {

    let err = await auth().createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    if (err.exist) {
      let message = err.message;

      return dispatch(SetAlert(message, "form"));
    }

    // // --> we get the token that firebase create
    // let token = user.refreshToken;
    // // --> we save the token to the local storage of the borowser
    // localStorage.setItem("token", token);

    let newUser = auth().currentUser;
    let CurrentUser = newUser.providerData[0];
    let defaultAvatar =
      "https://react.semantic-ui.com/images/avatar/large/matthew.png";
    let DefaultProfile = {
      name: newUser.displayName || "No Name",
      email: newUser.email,
      avatar: defaultAvatar,
      phoneNumber: 11111111,
    };

    await db.collection("users").doc(newUser.uid).set(DefaultProfile);
    dispatch({
      type: sign_up,
      payload: {
        // we pass 2 object
        CurrentUser: { ...CurrentUser, uid: user.uid }, // we add the id to the obj we create
        DefaultProfile, // we paass the profile we get
      },
    });
    console.log("success signup");
  } catch (error) {
    console.log("error", error);
    let message = error.message;
    let type = "form";
    dispatch(SetAlert(message, type));
  }
};
