import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import { v4 as uuid } from "uuid";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

export const AlertState = (props) => {
  const intialState = [];
  const [state, dispatch] = useReducer(AlertReducer, intialState);
  //set Alert
  const setAlert = (msg, type, timeout = 4000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
