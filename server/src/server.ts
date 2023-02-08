import { queryResolver } from "./graphql/resolvers/index";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers: queryResolver,
  context: ({ req, res }) => {
    if (
      req.body?.query?.match("login") ||
      req.body?.mutation?.match("register") ||
      req.body.operationName.match("IntrospectionQuery")
    ) {
      console.log("Open route");
    } else {
      console.log("Authorized route");
    }
    return { req, res };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
