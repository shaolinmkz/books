export interface IFeaturedBooks {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  subtitle: string;
  release_date: string;
  number_of_purchases: number;
  likes: number
  rating: number
  price: number
  featured: boolean
  image_url: string
  authors: {
    id: string;
    name: string;
  }[]
  tags: {
    id: string;
    name: string;
  }[]
  genres:{
    id: string;
    name: string;
  }[]
}
