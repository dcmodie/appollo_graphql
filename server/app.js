const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type User {
    url: String
    labels_url: String
  }

  type Query {
    users(perPage: Int, page: Int): [User]
  }
`;
//(limit: Int, offset: Int)

const resolvers = {
  Query: {
    users: async (perPage, page) => {
      console.log('aaa ', perPage);
      try {
        const users = await axios.get(
          `https://api.github.com/repositories/1300192/issues?per_page='+ perPage + '&page=1`
        );
        return users.data.map(({ url, labels_url }) => ({
          url,
          labels_url,
        }));
      } catch (error) {
        throw error;
      }
    },
  },
};
//https://api.github.com/users?
//https://api.github.com/repositories/1300192/issues?per_page=2&page=1
//https://api.github.com/repositories/1300192/issues?per_page=2&page=2
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
