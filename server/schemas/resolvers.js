const { Book, User } = require('../models');

const resolvers = {
    Query: {
        book: async () => {
            return Book.find();
        },
    }
}

