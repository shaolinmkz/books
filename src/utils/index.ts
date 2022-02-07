import { IAuthorTagGenre, IBooks, ICartBook } from "../interfaces";

export const extractAndMergeNames = (data?: IAuthorTagGenre[]) => {
  return data?.map(({ name }) => name).join(", ");
}

export const dateUtil = (date?: string) => new Date(`${date}`);

export const ternaryResolver = (condition: any, truthyValue: any, falsyValue: any) => {
  return condition ? truthyValue : falsyValue;
}

export const currencyFormatter = (amount?: number, currency?: string) => {
  return amount?.toLocaleString(`en-${currency?.slice?.(0, 2)}`, {
    style: "currency",
    currency,
  });
};

export const calculateSubtotal = (cart: ICartBook[]) => {
  return cart.reduce((accumulator, { count, price }: ICartBook) => accumulator + count * price, 0)
}

export const calculateCartSize = (cart: ICartBook[]) => {
  return cart.reduce((accumulator, { count }: ICartBook) => accumulator + count, 0)
}

export const extractQueryValue = (value: string, key = 'search') => {
  return new URLSearchParams(value).get(key) || ""
}

export const disableBodyScroll = (condition: boolean | null) => {
  if (condition) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

export const findNameMatch = (data: { id: string; name: string }[], query: string) => {
  return data.find(({ name }) => name.toLowerCase().includes(query));
};

export const findBookMatch = (bookId: string, data: IBooks[]) => {
  return data.find(({ id }) => id === bookId);
};

export const combineBookSearch = (books: IBooks[], search: string): Promise<IBooks[] | []> => {
  return new Promise((resolve) => {
    const searchTerm = extractQueryValue(search).toLowerCase();
    const searchData = books.filter(({ title, authors, genres, tags }) => {
      const matchTitle = title.toLowerCase().includes(searchTerm);
      const matchAuthors = findNameMatch(authors, searchTerm);
      const matchGenres = findNameMatch(genres, searchTerm);
      const matchTags = findNameMatch(tags, searchTerm);

      return [
        matchTitle,
        !!matchAuthors,
        !!matchGenres,
        !!matchTags,
      ].includes(true);
    });

    resolve(searchData);
  });
};
