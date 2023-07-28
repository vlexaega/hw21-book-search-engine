const { Book, User } = require('../models');
const { authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },
    users: async () => {
      return User.find();
    },
    me: async (_, __, { user }) => {
      if (user) {
        return User.findById(user._id).populate('savedBooks');
      }
      throw new Error('You need to be logged in to perform this action.');
    },
  },
  Mutation: {
    addBook: async (_, { bookData }, { user }) => {
      if (user) {
        const book = await Book.create(bookData);
        await User.findByIdAndUpdate(user._id, { $push: { savedBooks: book._id } });
        return book;
      }
      throw new Error('You need to be logged in to perform this action.');
    },
    addUser: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('Username or email already exists. Please choose a different one.');
      }

      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
