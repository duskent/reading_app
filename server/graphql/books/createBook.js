import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
import BookInputType from '../types/BookInputType'

const createBook = {
  createBook: {
    type: BookType,
    description: 'Creates new book in the database',
    args: {
      book: {type: BookInputType, description: 'Book input object'}
    },
    resolve: async (source, args) => {
      const {book} = args

      const newBook = await Book.create(book)

      return newBook
    }
  }
}

export default createBook
