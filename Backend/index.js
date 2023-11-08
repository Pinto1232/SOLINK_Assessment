const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 3001;

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo server
server.start().then(res => {
  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app });

  app.listen(port, () =>
    console.log(`Server listening on port ${port}${server.graphqlPath}`)
  );
});

// Rest of your Express app will remain here
app.get('/', (req, res) => res.send('Server is running!'));
