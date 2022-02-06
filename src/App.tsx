import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRoutes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import AppContextProvider from "./appContext";

const client = new ApolloClient({
  uri: "https://quidax-feec-graphql.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <Router>
    <AppContextProvider>
      <ScrollToTop>
        <ApolloProvider client={client}>
          <AppRoutes />
        </ApolloProvider>
      </ScrollToTop>
    </AppContextProvider>
  </Router>
);

export default App;
