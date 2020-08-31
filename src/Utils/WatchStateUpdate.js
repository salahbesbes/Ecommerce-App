import { useDispatch } from "react-redux";
import { GetAllProducts } from "../R-Action/Product-Action";
import { SetAlert } from "../R-Action/Alert-Action";
import { useEffect } from "react";
const { auth } = require("../firebase/config");

const WatchStateUpdate = token => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(  user => {
      if (user) {
        dispatch(GetAllProducts());
      } else if (!user) {
        console.log("user", user);
        let message = " Your are not Logged in pls try Again";
        dispatch(SetAlert(message, "articles", 10000));
        console.log("you are logged out ");
      }
    });
  }, []); // --> this fire one time when the component is mount

  return { auth: "watched" };
};

export default WatchStateUpdate;
