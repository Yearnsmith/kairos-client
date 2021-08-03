import { createContext, useContext  } from "react";

// create a new instance of createContext();
export const StateContext = createContext();

//  create a helper method to use the context
export const UseGlobalState = () => useContext(StateContext);