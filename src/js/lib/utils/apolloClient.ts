import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.lottiefiles.com/2022-08",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export default client;
