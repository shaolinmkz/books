import "./index.scss";

export const PageLoader = () => {

  return (
    <div className="page-loader">

    </div>
  );
};

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
};;
