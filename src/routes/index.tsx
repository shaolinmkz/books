import { Switch } from "react-router-dom";
import PublicLayout from "../layouts/Public";
import Home from "../views/Home";

const AppRoutes = () => {
	return (
		<Switch>
			<PublicLayout exact path={["/", "/books"]} component={Home} />
		</Switch>
	);
};

export default AppRoutes;
