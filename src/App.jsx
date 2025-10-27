import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NhostClient } from "@nhost/nhost-js";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import AllRoutes from "./Components/Allroutes/AllRoutes";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

const httpLink = createHttpLink({
  uri: nhost.graphql.getUrl(),
  headers: async () => {
    const token = (await nhost.auth.getSession())?.accessToken || "";
    return { Authorization: `Bearer ${token}` };
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

    useEffect(() => {

    nhost.auth.signOut().then(() => {
      setUser(null);
    });
  }, []); 

  return (
    <ApolloProvider client={client}>
      <Router>
        <AllRoutes
          user={user}
          setUser={setUser}
          nhost={nhost}
          chats={chats}
          setChats={setChats}
        />
      </Router>
    </ApolloProvider>
  );
}

export default App;
