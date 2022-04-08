import { Dispatch } from "react";
import { IBooks, ICartBook } from "../interfaces";
import {
  OPEN_CLOSE_CART,
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  REMOVE_FROM_CART,
  SEARCH_BOOKS,
  SEARCH_INPUT_OPEN,
  GET_ALL_BOOKS,
} from "./types";
import hardCodedBooks from '../fallbackData.json';

const { data: fallBackData } = hardCodedBooks;


interface IAction {
  type: string;
  payload: any;
}

export const initialState = {
  isCartOpen: null as (boolean | null),
  cart: [] as ICartBook[],
  dispatch: (() => { }) as Dispatch<IAction>,
  searchedBooks: [] as (IBooks[] | []),
  books: fallBackData as (IBooks[] | []),
  searchInputOpen: false,
};


const appReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: state.books.length ? state.books : payload,
      }
    case OPEN_CLOSE_CART:
      return {
        ...state,
        isCartOpen: payload,
      }
    case ADD_TO_CART: {
      const castPayload: ICartBook = payload;
      const foundBook = state.cart.find((item) => item.id === castPayload.id);
      const foundBookAndIncrement = state.cart.map((item: ICartBook) =>
        item.id === castPayload.id
        ? { ...item, count: item.count + 1, available_copies: item.available_copies - 1, }
        : item
      )

      const modifiedBook = {
        ...castPayload,
        count: 1,
        available_copies: castPayload.available_copies - 1,
      };

      return {
        ...state,
        cart: foundBook ? foundBookAndIncrement : [...state.cart, modifiedBook],
        books: state.books.map((item) => item.id === castPayload.id ? { ...item, available_copies: modifiedBook.available_copies } : item),
      }
    }
    case DECREMENT_CART_ITEM: {
      const castPayload: ICartBook = payload;
      const foundBook = state.cart.find((item) => item.id === castPayload.id);

      const modifiedBook = {
        ...castPayload,
        count: foundBook ? foundBook.count - 1 : 0,
        available_copies: foundBook ? castPayload.available_copies + 1 : 0,
      }

      return {
        ...state,
        cart: state.cart
                   .map((item: ICartBook) => item.id === modifiedBook.id ? modifiedBook : item)
                   .filter((item: ICartBook) => item.count === 0 ? false : true),
        books: state.books.map((item) => item.id === castPayload.id ? { ...item, available_copies: modifiedBook.available_copies } : item)
      }
    }
    case REMOVE_FROM_CART: {
      const castPayload: ICartBook = payload;

      return {
        ...state,
        cart: state.cart.filter((item: ICartBook) => item.id !== castPayload.id),
        books: state.books.map((item) => item.id === castPayload.id ? { ...item, available_copies: item.available_copies + castPayload.count } : item)
      }
    }
    case SEARCH_BOOKS:
      return {
        ...state,
        searchedBooks: payload,
      }
    case SEARCH_INPUT_OPEN:
      return {
        ...state,
        searchInputOpen: payload,
      }
    default:
      return state
  }
}

export default appReducer;
