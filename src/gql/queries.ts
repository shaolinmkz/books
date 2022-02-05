import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query Books (
    $sort: String,
    $limit: Int,
    $start: Int,
    $where: JSON,
    ) {
  books (
    sort: $sort,
    limit: $limit,
    start: $start,
    where: $where
  ) {
    id
    created_at
    updated_at
    title
    subtitle
    publisher
    release_date
    number_of_purchases
    likes
    rating
    price
    currency
    available_copies
    full_description
    featured
    image_url
    published_at
    authors {
      id
      name
    }
    tags {
      id
      name
    }
    genres{
      id
      name
    }
  }
}
`;

export const GET_FEATURED_BOOKS = gql`
  query FeaturedBooks (
    $sort: String,
    $limit: Int,
    $start: Int,
    $where: JSON,
    ) {
  books (
    sort: $sort,
    limit: $limit,
    start: $start,
    where: $where
  ) {
    id
    created_at
    updated_at
    title
    subtitle
    release_date
    number_of_purchases
    likes
    rating
    price
    featured
    image_url
    authors {
      id
      name
    }
    tags {
      id
      name
    }
    genres{
      id
      name
    }
  }
}
`;
