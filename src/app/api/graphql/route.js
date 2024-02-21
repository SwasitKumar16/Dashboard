import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import userSchema from "@/graphql/typedef/userSchema";
import userResolver from "@/graphql/resolvers/userResolver";
const apolloServer = new ApolloServer({
  typeDefs: [userSchema],
  resolvers: [userResolver],
});
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };
