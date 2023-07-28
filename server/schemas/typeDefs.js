const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [String!]!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book!]!
        bookCount: Int!
    }

    type Query {
        books: [Book!]!
        users: [User!]!
        me: User
    }

    type Mutation {
        addBook(bookData: BookInput!): Book
    }
`;

module.exports = typeDefs;