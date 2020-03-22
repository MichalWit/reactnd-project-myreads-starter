import { Shelf } from './BooksApp'

class BookshelfsFactory {

  static buildEmptyBookshelfs = () => {
    return (
      {
        bookshelfs: [
          { id: Shelf.CURRENTLY_READING, books: [] },
          { id: Shelf.WANT_TO_READ, books: [] },
          { id: Shelf.READ, books: [] }
        ]
      }
    )
  }

  static buildNewBookshelfs = (originalBookshelfs, id, source, destination) => {
    const reduceResult = originalBookshelfs
      .reduce((result, bookshelf) => {
        if (bookshelf.id == source) {
          const { removedBook, newBookshelf } = BookshelfsFactory.#removeFromBookshelf(id, bookshelf)
          result.removedBook = removedBook;
          result.newBookshelfs.push(newBookshelf);
          return result
        } else {
          result.newBookshelfs.push(bookshelf);
          return result
        }
      },
        {
          removedBook: null,
          newBookshelfs: []
        }
      );
    const finalResult = reduceResult.newBookshelfs.map((bookshelf) => {
      if (bookshelf.id == destination) {
        if(reduceResult.removedBook) bookshelf.books.push(reduceResult.removedBook)
        return bookshelf
      } else {
        return bookshelf
      }
    })
    return finalResult
  }

  static buildNewBookshelfsAfterAddition = (originalBookshelfs, book, destination) => {
    return originalBookshelfs
      .map((bookshelf) => {
          if (bookshelf.id == destination) {
            bookshelf.books.push(book);
            return bookshelf
          } else {
            return bookshelf
          }
        }
      );
  }

  static #partition = (toPartition, predicate) => {
    const [t, f] = toPartition
      .reduce((result, element) => {
        result[predicate(element) ? 0 : 1].push(element);
        return result;
      }, [[], []]);
    return [t, f]
  }

  static #removeFromBookshelf = (id, bookshelf) => {
    const [removedBookArray, newBooks] = BookshelfsFactory.#partition(bookshelf.books, (book) => (book.id == id))
    const removedBook = removedBookArray[0]
    if (removedBook) {
      return {
        removedBook: removedBook,
        newBookshelf: { id: bookshelf.id, books: newBooks }
      }
    } else {
      return {
        removedBook: removedBook,
        newBookshelf: bookshelf
      }
    }
  }
}

export default BookshelfsFactory
