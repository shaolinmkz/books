import { createContext, ReactNode, useReducer } from "react";
import appReducer, { initialState } from "./appReducer";

interface IProps {
  children: ReactNode
}

export const AppContext = createContext(initialState);

const ContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
