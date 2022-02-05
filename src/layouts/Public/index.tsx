import { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import TopNav from "../../components/TopNav";
import "./index.scss";

interface IProps {
  component: FunctionComponent;
  exact: boolean;
  path: string | readonly string[] | undefined;
}

const Public = (props: IProps) => {
  const { component: Component, exact, path, ...rest } = props;
  return (
    <div className="public-layout">
      <TopNav />
      <div className="inner-wrapper">
        <Route exact={exact} path={path} component={Component} {...rest} />
      </div>
    </div>
  );
};

export default Public;
