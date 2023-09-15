import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
