import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../gql/queries";
import "./index.scss";
import BookCarousel from "../../components/BookCarousel";

const Home = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {

    console.log({ loading, error, data })
  }, []);
  return (
    <div className="home-container">
      <h3>Featured Books</h3>
      <BookCarousel />
    </div>
  );
};

export default Home;
