import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./routes";

const client = new ApolloClient({
	uri: "https://quidax-feec-graphql.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});

const App = () => (
	<Router>
		<ApolloProvider client={client}>
			<AppRoutes />
		</ApolloProvider>
	</Router>
);

export default App;
