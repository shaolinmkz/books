import { IAuthorTagGenre } from "../interfaces";

export const extractAndMergeNames = (data?: IAuthorTagGenre[]) => {
  return data?.map(({ name }) => name).join(", ");
}

export const dateUtil = (date?: string) => new Date(`${date}`);

export const currencyFormatter = (amount?: number, currency?: string) => {
  return amount?.toLocaleString(`en-${currency?.slice?.(0, 2)}`, {
    style: "currency",
    currency,
  });
};
