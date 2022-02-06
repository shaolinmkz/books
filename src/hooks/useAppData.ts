import { useContext } from "react";
import { AppContext } from "../appContext";


export const useAppData = () => {
  const state = useContext(AppContext);

  return state;
};
