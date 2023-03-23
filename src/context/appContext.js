import { createContext, useReducer } from "react";
import data from "../json/data.json";
const initState = {
  data,
};
const reducer = (state, action) => {
  if (action.type === "FILTER") {
    return { ...state, data: action.payload };
  }
};
const appContext = createContext();
const AppProvider = ({ children }) => {
  return (
    <appContext.Provider value={useReducer(reducer, initState)}>
      {children}
    </appContext.Provider>
  );
};
export { AppProvider, appContext };
