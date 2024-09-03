const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Dummy data setup
const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User${i + 1}`,
  email: `user${i + 1}@example.com`,
  posts: Array.from({ length: 5 }, (_, j) => ({
    title: `Post Title ${j + 1} for User ${i + 1}`,
    content: `This is the content of post ${j + 1} for user ${i + 1}.`,
  })),
}));

// GraphQL Schema
const schema = buildSchema(`
  type User {
    id: Int
    name: String
    email: String
    posts: [Post]
  }

  type Post {
    title: String
    content: String
  }

  type Query {
    users(page: Int, limit: Int): [User]
    user(id: Int!): User
  }
`);

// Resolvers
const root = {
  users: ({ page = 1, limit = 10 }) => {
    const start = (page - 1) * limit;
    return users.slice(start, start + limit);
  },
  user: ({ id }) => users.find(user => user.id === id),
};

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL API running on http://localhost:${PORT}`);
});
