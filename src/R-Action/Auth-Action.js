import db from "../firebase/config";
import { login, sign_up, log_out, isLoading } from "../R-Const/TypeofAction";
import { auth } from "firebase";
import { SetAlert } from "./Alert-Action";

export const LogOut = () => dispatch => {
  auth().signOut();
  localStorage.removeItem("token");
  dispatch({ type: log_out });
};

export const LogIn = formData => async dispatch => {
  try {
    dispatch({ type: isLoading });
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
    dispatch({ type: isLoading });

  } catch (error) {
    console.log("error", error);
    let message = "There is no user record corresponding to this identifier";
    let type = "form";
    dispatch(SetAlert(message, type));
  }
};

export const Signup = user => dispatch => {
  auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(async newUser => {
      console.log("newUser", newUser);
      let defaultAvatar =
        "https://react.semantic-ui.com/images/avatar/large/matthew.png";
      let DefaultProfile = {
        name: newUser.user.displayName || "No Name",
        email: newUser.user.email,
        avatar: defaultAvatar,
        phoneNumber: 11111111,
      };

      // if we use add() instead of set() we add a new doc with a new id
      // so id we want the same id as the auth one , we use doc(user.id).set()
      dispatch({
        type: sign_up,
        payload: {
          // we pass 2 object
          CurrentUser: { ...newUser.user.providerData[0], uid: user.uid }, // we add the id to the obj we create
          DefaultProfile, // we paass the profile we get
        },
      });
     
      await db.collection("users").doc(newUser.user.uid).set(DefaultProfile);
      console.log("success signup");
    })
    .catch(error => {
      let message = error.message;
      let type = "form";
      dispatch(SetAlert(message, type));
    });
};
