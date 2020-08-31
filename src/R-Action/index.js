import db from "../firebase/config";
import { get_user } from "../R-Const/TypeofAction";
import { auth } from "firebase";

export const getUserProfile = () => async dispatch => {
  try {
    console.log("we access getuser");
    let CurrentUser = auth().currentUser;
    console.log("CurrentUser", CurrentUser);
    let userProfile = await (
      await db.collection("users").doc(CurrentUser.uid).get()
    ).data();
    console.log("userProfile", userProfile);
    dispatch({ type: get_user, payload: userProfile });
  } catch (error) {
    console.log("error", error);
  }
};
export const updateUserProfile = formData => async dispatch => {
  try {
    formData = { title: "test", price: 550 };
    console.log("we access update user profile");
    let CurrentUser = auth().currentUser;
    console.log("CurrentUser", CurrentUser);

    await db.collection("users").doc(CurrentUser.uid).set(formData);
    getUserProfile();
  } catch (error) {
    console.log("error", error);
  }
};
