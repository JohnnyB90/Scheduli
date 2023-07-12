require('dotenv').config({path: __dirname + '/../.env'});
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const routes = require('./controllers');

const typeDefs = require('./schemas/typeDefs/index');
const { resolvers } = require('./schemas');

const db = require('./config/connection');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

startApolloServer(typeDefs, resolvers);