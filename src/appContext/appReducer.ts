import { Dispatch } from "react";
import { IBooks, ICartBook } from "../interfaces";
import {
  OPEN_CLOSE_CART,
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  REMOVE_FROM_CART,
  SEARCH_BOOKS,
} from "./types";


interface IAction {
  type: string;
  payload: any;
}

export const initialState = {
  isCartOpen: null as (boolean | null),
  cart: [] as ICartBook[],
  dispatch: (() => { }) as Dispatch<IAction>,
  searchedBooks: [] as (IBooks[] | [])
};


const appReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case OPEN_CLOSE_CART:
      return {
        ...state,
        isCartOpen: payload,
      }
    case ADD_TO_CART: {
      const castPayload: ICartBook = payload;
      const foundBook = state.cart.find((item) => item.id === castPayload.id);
      const foundBookAndIncrement = state.cart.map((item: ICartBook) => item.id === castPayload.id ? { ...item, count: item.count + 1 } : item)

      const modifiedBook = {
        ...castPayload,
        count: 1,
      };

      return {
        ...state,
        cart: foundBook ? foundBookAndIncrement : [...state.cart, modifiedBook]
      }
    }
    case DECREMENT_CART_ITEM: {
      const castPayload: ICartBook = payload;
      const foundBook = state.cart.find((item) => item.id === castPayload.id);

      const modifiedBook = {
        ...castPayload,
        count: foundBook ? foundBook.count - 1 : 0,
      }
      return {
        ...state,
        cart: state.cart
          .map((item: ICartBook) => item.id === modifiedBook.id ? modifiedBook : item)
          .filter((item: ICartBook) => item.count === 0 ? false : true),
      }
    }
    case REMOVE_FROM_CART: {
      const castPayload: ICartBook = payload;

      return {
        ...state,
        cart: state.cart.filter((item: ICartBook) => item.id !== castPayload.id),
      }
    }
    case SEARCH_BOOKS:
      return {
        ...state,
        searchedBooks: payload,
      }
    default:
      return state
  }
}

export default appReducer;
