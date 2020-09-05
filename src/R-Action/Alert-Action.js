import { v4 as uuid } from "uuid";
import { Set_Error, remove_Alert, Clear_Errors } from "../R-Const/TypeofAction";

export const SetAlert = (message, type, time = 8000) => dispatch => {
  const id = uuid();

  dispatch({
    type: Set_Error,
    payload: { message, id, key: "_" + id, type },
  });

  setTimeout(() => {
    dispatch({ type: remove_Alert, payload: id });
  }, time);
};

export const ClearErrors = time => dispatch => {
  if (time) {
    setTimeout(() => {
      dispatch({ type: Clear_Errors });
    }, time);
  } else {
    dispatch({ type: Clear_Errors });
  }
};
