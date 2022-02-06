import { Switch } from "react-router-dom";
import PublicLayout from "../layouts/Public";
import Home from "../views/Home";
import BookDetails from "../views/BookDetails";

const AppRoutes = () => {
	return (
		<Switch>
			<PublicLayout exact path={["/", "/books"]} component={Home} />
			<PublicLayout exact path="/books/:bookId" component={BookDetails} />
		</Switch>
	);
};

export default AppRoutes;
