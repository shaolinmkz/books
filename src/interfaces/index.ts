
export interface IAuthorTagGenre {
  id: string;
  name: string;
}
export interface IBooks {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  subtitle: string;
  release_date: string;
  number_of_purchases: number;
  likes: number;
  rating: number;
  price: number;
  featured: boolean;
  image_url: string;
  publisher: string;
  currency: string;
  available_copies: number;
  full_description: string;
  published_at: string
  authors: IAuthorTagGenre[]
  tags: IAuthorTagGenre[]
  genres: IAuthorTagGenre[]
}

export interface ICartBook extends IBooks {
  count: number;
}

export interface IFeaturedBooks {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  subtitle: string;
  release_date: string;
  published_at: string;
  number_of_purchases: number;
  likes: number
  rating: number
  price: number
  featured: boolean
  image_url: string
  authors: IAuthorTagGenre[]
  tags: IAuthorTagGenre[]
  genres: IAuthorTagGenre[]
}
