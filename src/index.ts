import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/index';


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.start().then(res=> server.applyMiddleware({ app }))



app.get('/', (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
});


app.listen({ port: 4000 }, () => {
    console.log(`Server is running at http://localhost:4000${server.graphqlPath}`);
});