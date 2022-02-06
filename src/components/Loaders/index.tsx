import "./index.scss";



export const HorizontalSkeletonLoader = () => {

  return (
    <div className="h-skeleton-loader">
      <div>
      {"*".repeat(10).split("").map((_, index) => (
        <div key={index} className="skeleton">
          <div className="shimmer" />
        </div>
      ))}
      </div>
    </div>
  );
};


export const BooksLoader = () => {

  return (
    <div className="books-loader">
      <div>
      {"*".repeat(3).split("").map((_, index) => (
        <div key={index} className="skeleton">
          <div className="shimmer" />
        </div>
      ))}
      </div>
    </div>
  );
};
